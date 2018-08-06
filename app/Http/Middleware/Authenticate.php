<?php

namespace App\Http\Middleware;

use Auth;
use Exception;
use App\User;
use App\Preference;
use Closure;
use Illuminate\Http\Request;
use JWTAuth;

class Authenticate
{
    public function handle(Request $request, Closure $next)
    {
        // $time = time() + 86400; // 86400 = 1 day
        $time = time() + 3600; // 86400 = 1 hour

        //PRIMERO SE INTENTA OBTENER EL TOKEN DE LA COOKIE
        if ($jwt = $request->cookie('Authorization')) {
            //SI VIENE UN TOKEN, VERIFICAMOS QUE SEA VALIDO
            try {
                $token = str_replace("Bearer+", "", str_replace("Bearer ", "", $jwt));
                //SE HACE LOGIN EN JWT
                JWTAuth::setToken($token);
                JWTAuth::authenticate();
                //OBTENER NUEVO TOKEN
                $user = Auth::user();
                $token = JWTAuth::fromUser($user);
            } catch (Exception $e) {
                //TOKEN INVALIDO O EXPIRADO
                //VERIFICAMOS QUE VENGAN CREDENCIALES EN EL HEADER
                $response = $this->headerLogin($request);
                if (is_object($response)) {
                    return $response;
                }
                $token = $response;
            }
        } else {
            //VERIFICAMOS QUE VENGAN CREDENCIALES EN EL HEADER
            $response = $this->headerLogin($request);
            if (is_object($response)) {
                return $response;
            }
            $token = $response;
        }

        //SE CREA JWT CON FORMATO COOKIE
        $jwt = "Bearer {$token}";

        //SI ESTA TODO CORRECTO, SE CREA UNA COOKIE CON UN NUEVO TOKEN
        setcookie("Authorization", $jwt, $time, "/");

        //OBTENER USUARIO PROPIETARIO DEL TOKEN
        $user = isset($user) ? $user : Auth::user();

        if (empty($user)) {
            return response("incorrect_token", 401);
        }

        // Control de Acceso a los ambientes Alpha y Beta
        // if (false !== strpos($_SERVER['SERVER_NAME'], 'beta.widefense.com') && $user->beta_access == 0) {
        //     return response('invalid_beta_access', 401);
        // } else if (false !== strpos($_SERVER['SERVER_NAME'], 'alpha.widefense.com') && $user->alpha_access == 0) {
        //     return response('invalid_alpha_access', 401);
        // }

        //OBTENER PREFERENCIAS (CLIENTES VISIBLES) DEL USUARIO
        $preferences = Preference::where("user_id", $user->id)
        ->where('enabled', 1)
        ->get();

        //GUARDAR PREFERENCIAS DEL USUARIO EN LA SESION (PARA NO CONSULTARLAS EN CADA QUERY)
        session_start();
        foreach ($preferences as $preference) {
            $clients_id[] = $preference->client_id;
        }
        $_SESSION["clients_id"] = $clients_id;

        return $next($request);
    }

    private function headerLogin($request)
    {
        //OBTENER HEADER
        $header = $request->header('Authorization');

        //VERIFICAR SI TIENE CREDENCIALES EN EL HEADER
        if (0 === strpos($header, "Basic ")) {
            //OBTENER CREDENCIALES DE HEADER
            $base64 = str_replace("Basic ", "", $header);
            $auth = base64_decode($base64);
            $credentials = explode(":", $auth);
            $email = $credentials[0];
            // $password = $credentials[1];//LA CONTRASEÑA DEBE VENIR CODIFICADA CON htmlentities(sha1(md5()))
            $password = htmlentities(sha1(md5($credentials[1])));//LA CONTRASEÑA DEBE VENIR SIN CODIFICAR

            //VERIFICAR QUE USUARIO Y CONTRASEÑA EXISTAN
            $user = User::where([
                "email" => $email,
                "password" => $password,
            ])->first();

            //SI NO EXISTE, ENTONCES TERMINAR
            if (empty($user)) {
                return response("wrong_credentials", 401);
            }

            //OBTENER TOKEN
            $token = JWTAuth::fromUser($user);

            if (empty($token)) {
                return response("user_token_creation_error", 500);
            }
        }
        //SI NO TIENE CREDENCIALES EN EL HEADER, ENTONCES TERMINA
        else {
            //NO HAY CREDENCIALES EN EL HEADER
            return response("wrong_credentials", 401);
        }

        //SE HACE LOGIN EN JWT
        JWTAuth::setToken($token);
        JWTAuth::authenticate();

        return $token;
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
class LoginController extends Controller
{
    public function login(Request $request){
		// return $request;
		$jar = new \GuzzleHttp\Cookie\CookieJar();
		$client = new \GuzzleHttp\Client(['cookies'=>true]);

		try{
			$response = $client->post("https://ecore.builder.widefense.com/api/ecore/public/auth/login", [
            'auth' =>[
				$request->userName,$request->passWord
			]
		]);
		}catch(\Exception $ex){
			Session::flash('error','Usuario o contraseña incorrecto');
			return view("/login");
		}
        

		$cookieJar = $client->getConfig('cookies');
$cookies= $cookieJar->toArray();
$id= $cookies[1]['Value'];	
		//print_r($response->getHeader('Set-Cookie')['id']);
		//print_r($response);
		setcookie('id',$id,time()+ 28800,"/");
		//  return redirect("/socket")->withCookie('id',$id);
		return redirect("/socket");
	}
}

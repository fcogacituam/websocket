<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request){
		// return $request;
		$jar = new \GuzzleHttp\Cookie\CookieJar();
		$client = new \GuzzleHttp\Client(['cookies'=>$jar]);

        $response = $client->post("https://ecore.builder.widefense.com/api/ecore/public/auth/login", [
            'auth' =>[
				$request->userName,$request->passWord
			]
		]);

		$cookieJar = $client->getConfig('cookies');
		$cookieJar->toArray();
		
		var_dump($response->cookies) ;
		
		// return redirect("/socket")->withCookie('id');
	}
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request){
		// return $request;
		$jar = new \GuzzleHttp\Cookie\CookieJar();
		$client = new \GuzzleHttp\Client(['cookies'=>true]);

		
        $response = $client->post("https://ecore.widefense.com/api/ecore/public/auth/login", [
            'auth' =>[
				$request->userName,$request->passWord
			]
		]);

		$cookieJar = $client->getConfig('cookies');
$cookies= $cookieJar->toArray();
$id= $cookies[1]['Value'];	
		//print_r($response->getHeader('Set-Cookie')['id']);
		//print_r($response);
		setcookie('id',$id,time()+ 60,"/");
		//  return redirect("/socket")->withCookie('id',$id);
		return redirect("/socket");
	}
}

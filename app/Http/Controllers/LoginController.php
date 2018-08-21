<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request){
		// return $request;

		$client = new \GuzzleHttp\Client();

        $response = $client->post("https://ecore.builder.widefense.com/api/ecore/public/auth/login", [
            'auth' =>[
				$request->userName,$request->passWord
			]
		]);
		

		return redirect("/socket")->withCookie('id');
	}
}

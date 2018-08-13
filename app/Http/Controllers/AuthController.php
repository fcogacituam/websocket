<?php

//https://github.com/tymondesigns/jwt-auth/wiki/Creating-Tokens

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
//use Laravel\Lumen\Routing\Controller;

class AuthController
{

    public function login(Request $request)
    {
        $token = $request->header('Authorization');
//      return $request->withCookie(cookie('Authorization'));
        //return $request->header('Token');
        return $token;
    }
}


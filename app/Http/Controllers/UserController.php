<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function usuario(Request $request)
    {
        //acceder datos del token (sesión)
        $user = $request->user();

        //devolver del ORM Model de Eloquent
        return User::find($user->id);
    }

    public function getByEmail(Request $request)
    {
        if ($request->has('email')) {
            return User::where('email', $request->email)->first();
        }

        return;
    }
}

<?php

namespace App\Http\Controllers;

use App\Events\ClientsEvent;
use App\Events\KprimaEvent;
use App\Events\KprimasEvent;
use App\Events\MessageEvent;
use App\Events\UserEvent;
use Illuminate\Http\Request;
// use Laravel\Lumen\Routing\Controller;

class EventController extends Controller
{

    public function post(Request $request)
    {
        if (!$request->has('msg')) {
            return response('no_data', 400);
        }

        $msg = $request->msg;

        return event(new MessageEvent($msg));
    }

    public function kprima(Request $request)
    {
        if (!$request->has('id') || !$request->has('pathname')) {
            return response('no_data', 400);
        }

        $id = $request->id;
        $pathname = $request->pathname;
        $post = $request->input("post", null);
        $jwt = $request->cookie('Authorization');
        $idUser = $request->userId;
	$version = $request->version;
	$route= $request->route;
        return event(new KprimaEvent($id, $pathname, $post, $jwt, $idUser,$version,$route));
    }

    public function kprimas(Request $request)
    {
        if (!$request->has('pathname')) {
            return response('no_data', 400);
        }

        $pathname = $request->pathname;
        $post = $request->input("post", null);
        $jwt = $request->cookie('Authorization');
	$idUser = $request->idUser;

        return event(new KprimasEvent($pathname, $post, $jwt,$idUser));
    }

    public function user(Request $request)
    {
        // DATOS DEVUELTOS DESDE K'
        $msg = $request->input("msg", "");
        $state = $request->input("state", "");
	$ruta= $request->input("ruta","");

        if (!$request->has('id')) {
            return "Falta user id";
        }
        $id = $request->id;

        // return json_encode($request);
        return event(new UserEvent($msg, $state, $id,$ruta));
    }

    public function clients(Request $request)
    {
        if (!$request->has('msg')) {
            return response('no_data', 400);
        }

        $msg = $request->msg;

        return event(new ClientsEvent($msg));
    }

}

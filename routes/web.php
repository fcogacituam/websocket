<?php
use Illuminate\Http\Request;


Route::get("/socket",function(Request $request){

    $id = $request->cookie('id');
    if(!$id){
        return view("login");
    }
    return view("socket");
    
});
Route::post("/login",'LoginController@login');

<?php
use Illuminate\Http\Request;


Route::get("/socket",function(Request $request){

    print_r($request->cookie('id'));
    return view("socket");
    
});

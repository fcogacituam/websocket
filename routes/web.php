<?php
use Illuminate\Support\Facades\Request;


Route::get("/socket",function(Request $request){

    print_r($request->cookie('id'));
    return view("socket");
    
});

<?php

Route::get("/socket",function(Request $request){

    print_r($request->headers->all());
    return view("socket");
    
});

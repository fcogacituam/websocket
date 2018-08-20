<?php

Route::get("/socket",function(Request $request){

    print_r($request);
    return view("socket");
    
});

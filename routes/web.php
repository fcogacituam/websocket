<?php


Route::get("/socket",function(){
    broadcast(new \App\Events\PruebaEvent);
    return view("socket");
    
});

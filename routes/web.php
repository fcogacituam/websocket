<?php


Route::get("/socket",function(){

    return view("socket");
    
});

Route::get("/envioPrueba",function(){
    broadcast(new \App\Events\PruebaEvent);
});
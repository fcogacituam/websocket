<?php


Route::get("/socket",function(){
    broadcast(new \App\Events\PruebaEvent);
    broadcast(new \App\Events\KprimaEvent);
    return view("socket");
    
});

Route::get("/envioPrueba",function(){
    broadcast(new \App\Events\PruebaEvent);
});
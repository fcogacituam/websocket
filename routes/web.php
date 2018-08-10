<?php

use \App\Events\KprimaEvent;

Route::get("/socket",function(){
    // broadcast(new \App\Events\PruebaEvent);
    // broadcast(new \App\Events\KprimaEvent);
    event(new KprimaEvent("123"));
    return view("socket");
    
});

Route::get("/envioPrueba",function(){
    broadcast(new \App\Events\PruebaEvent);
});
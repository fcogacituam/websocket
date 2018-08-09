<?php


Route::get("/socket",function(){
   // return view("socket");
    broadcast(new \App\Events\PruebaEvent);
});

<?php

Route::get('/prueba',function(){
	return "esta es la ruta corecta";
});


// //https://www.toptal.com/laravel/restful-laravel-api-tutorial
// //https://gist.github.com/sohelamin/a85329700f1ecae1b490
// function resource($router, $uri, $controller)
// {
// //    global $router;
//     $router->get($uri, $controller . '@get');
//     $router->get($uri . '/{id}', $controller . '@first');
//     $router->post($uri, $controller . '@post');
//     $router->put($uri . '/{id}', $controller . '@put');
//     $router->patch($uri . '/{id}', $controller . '@patch');
//     $router->delete($uri . '/{id}', $controller . '@delete');
// }

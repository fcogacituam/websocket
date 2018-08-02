<?php
$router->group(['middleware' => 'jwt-auth'], function () use ($router) {

    $router->get('{class}', function (Illuminate\Http\Request $request, $class) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->get($request);
    });

    $router->get('{class}/{id}', function (Illuminate\Http\Request $request, $class, $id) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->find($id);
    });

    $router->post('{class}', function (Illuminate\Http\Request $request, $class) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->post($request);
    });

    $router->put('{class}/{id}', function (Illuminate\Http\Request $request, $class, $id) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->put($request, $id);
    });

    $router->patch('{class}/{id}', function (Illuminate\Http\Request $request, $class, $id) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->patch($request, $id);
    });

    $router->delete('{class}/{id}', function (Illuminate\Http\Request $request, $class, $id) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->delete($request, $id);
    });

    // EXTRA
    $router->post('{class}/{method}', function (Illuminate\Http\Request $request, $class, $method) {
        $controller = app()->make("App\\Http\\Controllers\\" . ucwords($class) . "Controller");
        return $controller->$method($request);
    });

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

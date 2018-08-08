<?php


use App\Events\ExampleEvent;
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

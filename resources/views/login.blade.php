<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <title>Document</title>
</head>
<body>
    <div id="app">

    <form method="POST" action="{{ url('login') }}" >
        <input name="_token" type="hidden" value="{{ csrf_token() }}"/>
            <div class="form-group"><label for="">User: </label><input  type="text" class="form-control" id="userName" name="userName"></div>
            <div class="form-group"><label for="">Password: </label><input type="password" class="form-control" id="passWord" name="passWord"></div>
            <input  type="submit" class="btn btn-primary" value="Entrar">
        </form>

    </div>

     <script src="{{ asset('js/app.js')}}"></script>
</body>
</html>
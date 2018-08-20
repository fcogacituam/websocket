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

        <form action="">
            <div class="form-group"><label for="">User: </label><input v-model="userN" type="text" class="form-control"></div>
            <div class="form-group"><label for="">Password: </label><input v-model="pass" type="password" class="form-control"></div>
            <input v-on:click.prevent="login" type="submit" class="btn btn-primary" value="Entrar">
        </form>

    </div>

     <script src="{{ asset('js/app.js')}}"></script>
</body>
</html>
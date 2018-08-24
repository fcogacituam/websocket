<!DOCTYPE html>
<html lang="en" style="height:100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <title>Document</title>
</head>
<body class="login">
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-md-12 login">
                    <img src="images/logo_ethalamus.png" alt="">
                    <form method="POST" action="{{ url('login') }}" >
                        <input name="_token" type="hidden" value="{{ csrf_token() }}"/>
                        <div class="form-group"><input  type="text" class="form-control" id="userName" name="userName" placeholder="Usuario: "></div>
                        <div class="form-group"><input type="password" class="form-control" id="passWord" name="passWord" placeholder="Password"></div>
                        <input  type="submit" class="btn btn-primary" value="Entrar">
                    </form>
                    @if (Session::has('error'))
                        <div class="alert alert-info">{{ Session::get('error') }}</div>
                    @endif
                </div>
            </div>
        </div>
    </div>

     <script src="{{ asset('js/app.js')}}"></script>
</body>
</html>
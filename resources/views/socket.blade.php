<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <title>Sockets</title>
</head>
<body>
    <div id="app">
        <h2>Hola desde Sockets</h2>
         <u>Versionamiento local:</u>
        <b>@{{lastVersion}}</b>

        <table>
            <tr v-for='(repositorio, name) in repositorios_local'>
                <td style="padding-right: 10px">
                    @{{name}}:
                </td>

                <template v-if="repositorios_local[name].version">
                    <td style="padding-right: 10px">
                        <b class='version'>@{{repositorios_local[name].version.split(/-| /)[0]}}</b>
                        <span v-if="-1 != repositorios_local[name].version.indexOf('-')">-@{{repositorios_local[name].version.split(/-/).slice(1).join('-')}}</span>
                    </td>

                    <!-- VERSION INCORRECTA -->
                    <td style="padding-right: 10px">
                        <!-- DIFF VERSION -->
                        <span v-if="repositorios_local[name].diff" :style="{'color': repositorios_local[name].diff > 0 ? 'green' : 'red'}" :title="repositorios_local[name].count - repositorios_local[name].tags[repositorios_local[name].update]">
                            [@{{repositorios_local[name].diff > 0 ? '+' : ''}}@{{repositorios_local[name].diff}}]
                        </span>
                    </td>

                    <td style="padding-right: 10px">
                        <!-- LOADING -->
                        <i v-if="repositorios_local[name].loading" class="fa fa-spinner fa-pulse fa-fw"></i>

                        <span v-else-if="repositorios_local[name].diff">
                            <!-- UPDATE VERSION -->
                            <a @click="actualizar(name, repositorios_local[name].update)" href="javascript:void(0)">
                                @{{repositorios_local[name].diff > 0 ? 'devolver' : 'actualizar'}} a
                                <b>@{{repositorios_local[name].update}}</b>
                            </a>
                        </span>

                        <span v-else>✓</span>
                    </td>
                </template>

                <td v-else class="text-danger">
                    el repositorio no existe y se descargará automáticamente (puede tardar unos minutos)
                </td>
            </tr>
        </table>

    </div>
    

 <script src="{{ asset('js/app.js')}}"></script>
</body>
</html>
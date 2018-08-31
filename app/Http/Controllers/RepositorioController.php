<?php

namespace App\Http\Controllers;

use App\Repositorio;
use Illuminate\Http\Request;

class RepositorioController extends Controller
{

    private $gitUrl = "https://rydwidefense:Wide.1906\!@github.com/widefense";
    private $repos = [
        'api_kprima' => [
            'route' => "/var/www/html/api/kprima",
        ],
        'api_monitores'=> [
            'route' = > '',
        ],
        'api_ecore'=> [
            'route' = > '',
        ],
        'api_incidents'=> [
            'route' = > '',
        ],
        'api_ethalamus'=> [
            'route' = > '',
        ],
        'api_casos'=> [
            'route' = > '',
        ],
        'ethalamus'=> [
            'route' = > '',
        ],
        'ecore'=> [
            'route' = > '',
        ],
        'osticket'=> [
            'route' = > '',
        ],
        'comandos'=> [
            'route' = > '',
        ],
        'graphics'=> [
            'route' = > '',
        ],
        'wsc'=> [
            'route' = > '',
        ],
        'incidentes'=> [
            'route' = > '',
        ],
        'objects-nagios' => [
            'route' => "/usr/local/nagios/etc/objects/repo",
        ],
        'scripts-nagios' => [
            'route' => "/usr/local/nagios/etc/scripts",
        ],
    ];

    // public function get(Request $request)
    // {
    //     //return Repositorio::get();
    //     return $this->repos;
    // }

    public function download(Request $request)
    {
        $repo = $request->repo;
        $version = $request->version;
        $gitUrl = $this->gitUrl;

        $path = "../storage/vendor";
        $route = "$path/$repo";

        //CLONE
        $gitUrl = $this->gitUrl;
        exec("git clone $gitUrl/$repo.git $route 2>&1", $out);

        //CHECK DIR EXISTS
        if (!file_exists($route)) {
            array_push($out, "error: !path $route");
            return $out;
        }

        exec("cd $route; git checkout $version 2>&1", $out);

        return $out;
    }

    public function actualizar(Request $request)
    {
        $nombreRepo = $request->repo;
        $version = $request->version;
        $gitUrl = $this->gitUrl;

        $res = [];
        $cd = "cd ../storage/vendor/$nombreRepo";

        exec("$cd; git fetch $gitUrl/$nombreRepo.git 2>&1", $out);
        $res = array_merge($res, $out);

        exec("$cd; git checkout {$version} 2>&1", $out);
        $res = array_merge($res, $out);

        return $res;
    }

    public function reposVersions(Request $request)
    {
        $repos = $this->repos;

        foreach ($repos as $name => &$repo) {
            $out = null;
            $cd = "cd ../storage/vendor/$name";

            // SI NO HAY DIRECTORIO, DESCARGAR REPOSITORIO
            exec("$cd/.git 2>&1", $out);
            //dd($out);
            if(count($out) && false !== strpos($out[0], "No such file or directory")){
                $out = null;
                exec("mkdir $cd; git clone https://rydwidefense:Wide.1906!@github.com/widefense/$name.git ../storage/vendor/$name 2>&1", $out);
                //return $out;
            } else {
                // DESCARGAR LOS ÚLTIMOS DATOS DEL REPOSITORIO REMOTO GITHUB
                exec("$cd; git fetch;");
            }

            // NOMBRE DE LA VERSIÓN (TAG)
            exec("$cd; git describe --tags 2>&1", $out);
            // if (strpos($out[0], "fatal") !== false) {
            //     continue;
            // }
            $repo['version'] = $out[0];

            // NÚMERO DE COMMIT
            $out = null;
            exec("$cd; git rev-list HEAD --count 2>&1", $out);
            $repo['count'] = $out[0];

            // TODAS LAS VERSIONES EXISTENTES DEL REPOSITORIO
            $tags = null;
            exec("$cd; git tag -l 2>&1", $tags);

            $arr = [];
            for ($i = 0; $i < count($tags); $i++) {
                $tag = $tags[$i];

                $out = null;
                exec("$cd; git rev-list $tag --count 2>&1", $out);
                $arr[$tag] = $out[0];
            }

            $repo['tags'] = $arr;
        }

        return $repos;
    }

    public function actualizar_todo(Request $request)
    {
        $version = $request->has("version") ? $request->version : null;

        $repos = Repositorio::select("Nombre")->get();

        $res = [];
        for ($i = 0; $i < count($repos); $i++) {
            $repo = $repos[$i]["Nombre"];
            $out = $this->actualizar_repo($repo, $version);

            $res = array_merge($res, $out);
        }

        return $res;
    }

    private function actualizar_repo($repo, $version)
    {
        if (empty($repo) || empty($version)) {
            return "undefined repo / version";
        }

        $path = "../storage/vendor";
        $ruta = "$path/$repo";

        $emptyDir = $this->is_dir_empty($ruta);

        if (file_exists($ruta) && !$emptyDir) {
            //PULL
            exec("cd $ruta; git fetch $repo master; 2>&1", $out);
        } else {
            //CLONE
            $gitUrl = $this->gitUrl;
            exec("git clone $gitUrl/$repo.git $ruta 2>&1", $out);
        }

        //CHECK DIR EXISTS
        if (!file_exists($ruta)) {
            array_push($out, "error: !path $ruta");
            return $out;
        }

        exec("cd $ruta; git checkout $version 2>&1", $out);

        return $out;
    }

    private function is_dir_empty($dir)
    {
        if (!is_readable($dir)) {
            return true;
        }
        return (count(scandir($dir)) == 2);
    }

}


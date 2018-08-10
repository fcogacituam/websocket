<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Broadcast::routes();
       // require base_path('routes/channels.php');
    


	 //PUBLICS
        Broadcast::channel('messages', function ($user) {
            //return false;
            //return "ola q tal";
            //return $user;
            return true;
        });
         Broadcast::channel('test-event',function(){
            return [
                'message'  => 'entre al test event :D'
            ];
        });

        //PRIVATES
        Broadcast::channel('user.{id}', function ($user, $userId) {
            if ($user->Id == $userId) {
                return $user;
            }
        });

        // Broadcast::channel('kprima.{id}', function ($user, $krpimaId) {
        //     return "respuesta desde BroadcastServiceProvider";
        //    // return [    
        //      //   'id' => $krpimaId,
        //    // ];
        // });
Broadcast::channel('kprima.{id}', function () {
            return "respuesta desde BroadcastServiceProvider";
           // return [    
             //   'id' => $krpimaId,
           // ];
        });
        //PRESENTIALS
        Broadcast::channel('clients', function ($user) {
            $data = ['id' => $user->Id, 'name' => $user->Nombre];
            return $data;
        });
        Broadcast::channel('kprimas', function ($user) {
            //$data = ['id' => $user->Id, 'name' => $user->Nombre];
            $kprima = ['id' => Input::get('kprimaId')];
            return $kprima;
        });
    }
}

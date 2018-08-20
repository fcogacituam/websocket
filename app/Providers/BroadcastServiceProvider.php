<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Input;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Broadcast::routes(['middleware'=>'jwt-auth']);
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
    //        if ($user->Id == $userId) {
      //          return $user;
        //    }
       

		return true;
	 });

        Broadcast::channel('kprima.{id}', function ($user, $krpimaId) {
           return [    
               'id' => $krpimaId,
           ];
        });

        //PRESENTIALS
        Broadcast::channel('clients', function ($user) {
            // $data = ['id' => $user->Id, 'name' => $user->Nombre];
            $data = ['id' => '1', 'name' => 'Francisco'];
            return $data;
        });
        Broadcast::channel('kprimas', function ($user) {
            //$data = ['id' => $user->Id, 'name' => $user->Nombre];
            $kprima = ['id' => Input::get('kprimaId')];
            return $kprima;
        });
    }
}

<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('kprima.{id}',function($user,$kprimaId){
	return $user;
});
Broadcast::channel('test-event',function(){
	return "canal publicoooooooooooooo entra nomas :$ ";
});
Broadcast::channel('kprimas',function(){
	return[
		'token' => 'token',
		'message' => 'mensaje'
	];

});

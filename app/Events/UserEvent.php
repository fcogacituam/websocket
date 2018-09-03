<?php

//https://laravel.com/docs/5.6/events

namespace App\Events;

use Auth;
use Illuminate\Broadcasting\InteractsWithSockets;
//use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class UserEvent implements ShouldBroadcast
{

//    use SerializesModels;
    use InteractsWithSockets,
        SerializesModels;

    public $msg;
    public $state;
    private $user_id;
    public $ruta;
    public function __construct($msg, $state, $user_id,$ruta)
    {
        $this->msg = $msg;
        $this->state = $state;
        $this->user_id = $user_id;
	$this->ruta=$ruta;
    }

    public function broadcastOn()
    {
        // echo json_encode(Auth::user());
        return new PrivateChannel('user.' . $this->user_id);
    }

}


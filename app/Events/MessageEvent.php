<?php

//https://stackoverflow.com/questions/46095326/laravel-echo-server-with-socket-io-and-redis?rq=1

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
//use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageEvent implements ShouldBroadcast {

    use InteractsWithSockets, SerializesModels;
//    use Dispatchable, InteractsWithSockets;

    public $msg;

    public function __construct($msg, $from) {
        $this->msg = $msg;
    }

    public function broadcastOn() {
        return new Channel('messages');
    }

}


<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ClientsEvent implements ShouldBroadcast {

    use InteractsWithSockets,
        SerializesModels;

    public $msg;

    public function __construct($msg) {
        $this->msg = $message;
    }

    public function broadcastOn() {
        return new PresenceChannel('clients');
    }

}


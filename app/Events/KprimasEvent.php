<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KprimasEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $pathname;
    public $post;
    public $jwt;
public $idUser;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($pathname, $post, $jwt,$idUser)
    {
        $this->pathname = $pathname;
        $this->post = $post;
        $this->jwt = $jwt;
	    $this->idUser = $idUser;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('kprimas');
    }
}

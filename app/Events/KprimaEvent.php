<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KprimaEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $kprima_id;
    public $pathname;
    public $post;
    public $jwt;


    public function __construct($kprima_id,$pathname, $post, $jwt)
    {
      	$this->kprima_id = $kprima_id;
        $this->pathname = $pathname;
        $this->post = $post;
        $this->jwt = $jwt;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('kprima.'.$this->kprima_id);
    }


    public function broadcastWith(){
        return [
            'message' => 'mensaje desde Kprima Event',
            'id' => $this->kprima_id
        ];
    }
}


<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Message;
use App\Http\Resources\MessageResource;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class MessageChangedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */ 
    public $message;

    public function __construct( Message $message)
    { 
        $message->load('receiver_id','sender_id');
        $this->message = MessageResource::make($message);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('chat');
    }
    public function broadcastAs()
    {
        $arr= [$this->message->sender_id, $this->message->receiver_id];
        sort($arr);
        return "chatsent-". $arr[0]."-". $arr[1];
    }
    
}

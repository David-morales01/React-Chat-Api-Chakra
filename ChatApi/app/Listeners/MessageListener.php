<?php

namespace App\Listeners;

use App\Events\MessageChangedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MessageListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\MessageChangedEvent  $event
     * @return void
     */
    public function handle(MessageChangedEvent $event)
    {
        //
    }
}

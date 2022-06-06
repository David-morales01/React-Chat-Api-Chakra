<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Http\Resources\MessageResource;
use App\Http\Resources\MessageCollection;
use App\Models\Message;
use App\Events\MessageChangedEvent;


class MessageController extends Controller
{
  
    public function chat(User $user)
    {
        $auth_id = Auth::id(); 
        $messages = Message::query()
            ->with('receiver_id', 'sender_id')
            ->where(function ($query) use ($user, $auth_id) {
                $query->where('sender_id', $auth_id)->where('receiver_id', $user->id);
            })->orWhere(function ($query) use ($user, $auth_id) {
                $query->where('receiver_id', $auth_id)->where('sender_id', $user->id);
            })->orderBy('created_at')->get();
        return MessageCollection::make($messages);
    }

     
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'sender_id'=>['required'],
                'receiver_id'=>['required'],
                'text'=>['required'],
            ]
        );
        $message = Message::create($data)->fresh();
        $message ->load('receiver_id');
        MessageChangedEvent::dispatch($message);
       return MessageResource::make($message); 
    }
}

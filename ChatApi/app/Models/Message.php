<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Message extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function sender_id(){return $this->belongsTo(User::class);}
    public function receiver_id(){return $this->belongsTo(User::class);}
}

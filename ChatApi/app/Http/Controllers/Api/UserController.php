<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource; 
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  
    public function listUsers()
    
    {
    $id = Auth::id(); 
    $users = User::all()->where('id','!=',$id);
        return UserResource::collection($users);
    }

  
}

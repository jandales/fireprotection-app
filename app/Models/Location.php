<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{   

    protected $fillable = [
        'location',
        'ipAddress',
        'clients_id',      
    ];

    protected $appends = [
        // 'clientName'
    ];

    protected $hidden = [
        'user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getclientNameAttribute(){
        return $this->user->name;
    }
    
}

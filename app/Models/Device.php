<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Device extends Model
{
    protected $fillable = [
        'macAddress',
        'ipAddress',
        'latitude',
        'longitude',
        'location',
        'ysnLocation',
        'user_id',  
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

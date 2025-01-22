<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
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

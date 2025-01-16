<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Device;

class Location extends Model
{   

    protected $fillable = [
        'device_id',
        'latitude',
        'longitude',              
    ];

    protected $appends = [
        // 'clientName'
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }

    
    
}

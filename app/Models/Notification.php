<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Notification extends Model
{
    protected $fillable = [
       'user_id',    
       'device_id', 
       'latitude',
       'longitude',          
       'location',
       'message',
       'status'      
    ];

    protected $appends = [
        'device',
        'name',
        'macAddress'              
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:Y-m-d H:00',
        ];
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function device(): HasOne
    {
        return $this->hasOne(Device::class, 'id', 'device_id');
    }

    // Accessor for 'name' attribute
    public function getNameAttribute(): ?string
    {
        return $this->user ? $this->user->name : null;
    }

    // Accessor for 'device' attribute
    public function getDeviceAttribute(): ?string
    {
        return $this->device()->first()?->name;
    }

    public function getMacAddressAttribute(): ?string
    {
        return $this->device()->first()?->macAddress;
    }
}

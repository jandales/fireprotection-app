<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Device extends Model
{
    protected $fillable = [
        'macAddress',
        'ipAddress',
        'resident_id'     
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function location(): HasOne
    {
        return $this->hasOne(Location::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resident extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phoneno',
        'avatar',
        'address',      
    ];

    protected $appends = [
        'name',
        'fullAddress'
    ];

    public function devices(): HasMany
    {
        return $this->hasMany(Device::class);
    }

    public function getNameAttribute(){
        return $this->firstname . ' ' . $this->lastname;
    }

    public function getFullAddressAttribute() {
        return $this->address . ' ' . $this->address2 . ' ' . $this->city . ' ' . $this->province . ' ' . $this->zip;
    }


}

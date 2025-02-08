<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'changes'       
    ]; 

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

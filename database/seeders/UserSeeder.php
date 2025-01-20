<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserSetting;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(100)
            ->create()
            ->each(function ($user) {
                if($user->role == 'user'){
                    UserSetting::create([           
                        'user_id' => $user->id  
                    ]);
                }                                  
        });
    }
}

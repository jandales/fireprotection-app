<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $email = 'admin@test.com';

        if (!User::where('email', $email)->exists()) {
            User::create([
                'name' => 'admin',
                'email' => 'admin@test.com',
                'password' => Hash::make('admin12345'),
                'role' => 'administrator',
                'status' => 1,
                'master' => 1 
            ]);
        }

    }
}

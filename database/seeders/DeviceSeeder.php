<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Device;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users  = User::where('role', 'user')->get();

        foreach($users as $user)
        {
            Device::factory(10)->create([           
                'user_id' => $user->id
            ]);          
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Device;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users  = User::where('role', 'user')->get();

        foreach($users as $user)
        {
            $device = Device::where('user_id', $user->id)
                                ->where('ysnLocation', 1)
                                ->first();

            Notification::create([           
                'user_id' => $user->id,
                'device_id'  => $device->id,
                'location'  => $device->location
            ]);          
        }
    }
}

<?php

namespace Database\Seeders;

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
        $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            for ($i = 0; $i < 10; $i++) {
                // Metro Manila bounds (approx.)
                $latitude = fake()->latitude(14.45, 14.75);
                $longitude = fake()->longitude(120.95, 121.12);
                $ysnLocation = fake()->boolean(50);

                Device::factory()->create([
                    'user_id' => $user->id,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'ysnLocation' => $ysnLocation,
                    'location' => $ysnLocation
                        ? fake()->streetAddress() . ', Manila, Philippines'
                        : null,
                ]);
            }
        }
    }
}

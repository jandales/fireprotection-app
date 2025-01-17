<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $residents = [
            [
                'firstname' => 'John',
                'lastname' => 'Doe',
                'email' => 'john.doe@example.com',
                'phoneno' => '1234567890',
                'avatar' => 'path/to/avatar1.jpg',
                'address' => '123 Main St',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'firstname' => 'Jane',
                'lastname' => 'Smith',
                'email' => 'jane.smith@example.com',
                'phoneno' => '9876543210',
                'avatar' => 'path/to/avatar2.jpg',
                'address' => '456 Elm St',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($residents as $resident) {
            // Insert resident and retrieve the ID
            $residentId = DB::table('residents')->insertGetId($resident);

            // Insert device for each resident
            $deviceId = DB::table('devices')->insertGetId([
                'resident_id' => $residentId,
                'device_name' => 'Device for ' . $resident['firstname'],
                'macAddress' => strtoupper(uniqid('MAC_')),
                'ipAddress' => '192.168.1.' . rand(1, 255),
                'serial_number' => 'SN' . strtoupper(uniqid()),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Insert locations for the device
            DB::table('locations')->insert([
                [
                    'device_id' => $deviceId,
                    'latitude' => rand(-90, 90) + rand(0, 999999) / 1000000, // Random latitude
                    'longitude' => rand(-180, 180) + rand(0, 999999) / 1000000, // Random longitude
                    'isDefault' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'device_id' => $deviceId,
                    'latitude' => rand(-90, 90) + rand(0, 999999) / 1000000, // Another random latitude
                    'longitude' => rand(-180, 180) + rand(0, 999999) / 1000000, // Another random longitude
                    'isDefault' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}

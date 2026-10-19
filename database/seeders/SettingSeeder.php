<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {          
            if(Setting::count() == 0) {
                Setting::create([
                    'stationName' => 'Fire Station',
                    'latitude' => 14.5995,
                    'longitude' => 120.9842,
                    'location' => 'Manila, Philippines',
                ]);
            }
    }
}

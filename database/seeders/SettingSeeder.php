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
                    'latitude'  => null,
                    'longitude' => null,
                    'location'  =>  null,
                ]);
            }
    }
}

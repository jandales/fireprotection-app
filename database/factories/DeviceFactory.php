<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ysnLocation = fake()->boolean(50);
        return [
            'macAddress' => fake()->macAddress(),
            'ipAddress' => fake()->ipv4(),
            'latitude'  => fake()->latitude(-90, 90),
            'longitude' => fake()->longitude(-180,180),
            'location' =>  $ysnLocation == true ? fake()->address() : null,
            'ysnLocation' =>  $ysnLocation,
            'user_id' => 1
        ];
    }
}

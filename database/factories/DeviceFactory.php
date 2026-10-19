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

        // Metro Manila bounds (approx.)
        $latitude = fake()->latitude(14.45, 14.75);
        $longitude = fake()->longitude(120.95, 121.12);

        return [
            'name' => 'Device-' . fake()->randomNumber(5, false),
            'macAddress' => fake()->macAddress(),
            'ipAddress' => fake()->ipv4(),
            'latitude' => $latitude,
            'longitude' => $longitude,
            'location' => $ysnLocation
                ? fake()->streetAddress() . ', Manila, Philippines'
                : null,
            'ysnLocation' => $ysnLocation,
            'user_id' => 1,
        ];
    }
}

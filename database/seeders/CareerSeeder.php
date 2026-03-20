<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        $careers = [
            [
                'title' => 'Store Manager',
                'type' => 'Full Time',
                'location' => 'HSR Layout, Bengaluru',
                'description' => 'We are looking for an experienced Store Manager to oversee daily operations, manage staff, and ensure excellent customer service at our HSR Layout store.',
            ],
            [
                'title' => 'Sales Executive',
                'type' => 'Full Time',
                'location' => 'Koramangala, Bengaluru',
                'description' => 'Join our sales team to help customers find the perfect dry fruits and gift boxes. Must have excellent communication skills and a passion for healthy food.',
            ],
            [
                'title' => 'Digital Marketing Specialist',
                'type' => 'Full Time',
                'location' => 'Remote',
                'description' => 'We need a creative Digital Marketing Specialist to manage our social media, run campaigns, and grow our online presence.',
            ],
            [
                'title' => 'Delivery Associate',
                'type' => 'Part Time',
                'location' => 'Bengaluru',
                'description' => 'Reliable delivery associates needed for timely delivery of orders across Bengaluru. Must have a valid driving license and own vehicle.',
            ],
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }
    }
}

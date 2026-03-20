<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'HSR Layout',
                'address' => 'NR TOWERS, 17th Cross, Sector 4, 19th Main Rd, HSR Layout, Bengaluru - 560102',
                'phone' => '+91-7483600212',
                'hours' => '9AM - 9PM',
                'image' => 'https://dryfruithouse.com/assets/img/banner/showroom-dryfruit.jpg',
            ],
            [
                'name' => 'Koramangala',
                'address' => '80 Feet Road, Koramangala 4th Block, Bengaluru - 560034',
                'phone' => '+91-7483600213',
                'hours' => '9AM - 9PM',
            ],
            [
                'name' => 'Indiranagar',
                'address' => '100 Feet Road, Indiranagar, Bengaluru - 560038',
                'phone' => '+91-7483600214',
                'hours' => '9AM - 9PM',
            ],
            [
                'name' => 'Whitefield',
                'address' => 'ITPL Main Road, Whitefield, Bengaluru - 560066',
                'phone' => '+91-7483600215',
                'hours' => '10AM - 8PM',
            ],
        ];

        foreach ($locations as $loc) {
            Location::create($loc);
        }
    }
}

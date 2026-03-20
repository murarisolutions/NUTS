<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@nammanuts.com',
            'password' => bcrypt('password'),
            'phone' => '+91-7483600212',
            'role' => 'admin',
        ]);

        // Test customer
        User::create([
            'name' => 'Test Customer',
            'email' => 'customer@test.com',
            'password' => bcrypt('password'),
            'phone' => '+91-9876543210',
            'role' => 'customer',
        ]);

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            LocationSeeder::class,
            CareerSeeder::class,
            ReviewSeeder::class,
            TasteFirstSettingSeeder::class,
        ]);
    }
}

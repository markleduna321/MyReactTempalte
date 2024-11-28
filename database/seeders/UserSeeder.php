<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Mark Harvey',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'role_id' => 1, // Assuming '1' is the admin role
                'is_online' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Test Regular User',
                'email' => 'user@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'role_id' => 2, // Assuming '2' is the regular user role
                'is_online' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Sara Sleman',
            'email' => 'sara@gmail.com',
            'password' => Hash::make('Sara@2002'),
            'phone' => 1234567890,
            'dob' => '1990-01-01',
            'role' => 'admin',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a user with predefined values
        User::factory()->create([
            'name' => 'Firew',
            'email' => 'firewfilpos27@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now()
        ]);

        // Create 30 projects, each with 30 tasks
        Project::factory(30) // Create 30 projects
            ->hasTasks(30)     // Each project will have 30 tasks
            ->create();
    }
}


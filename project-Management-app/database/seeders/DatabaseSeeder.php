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
        
        User::factory()->create([
            'name' => 'Firew',
            'email' => 'firewfilpos27@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now()
        ]);

    
        Project::factory(30) 
            ->hasTasks(30)     
            ->create();
    }
}


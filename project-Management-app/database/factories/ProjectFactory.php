<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),          // Generates a random sentence for project name
            'description' => $this->faker->paragraph(),  // Generates a random paragraph for project description
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'), // Random due date within the next year
            'status' => $this->faker->randomElement(['pending', 'completed', 'in_progress']), // Random project status
            'image_path' => $this->faker->imageUrl(),    // Generates a random image URL
            'created_by' => 1,                            // Assuming user ID 1 created the project
            'updated_by' => 1,                            // Assuming user ID 1 updated the project
            'created_at' => now(),                       // Current timestamp
            'updated_at' => now(),                       // Current timestamp
        ];
    }
}

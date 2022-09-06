<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' => rand(1, 5),
            'name' => $name = str($this->faker->sentence(2))->title(),
            'slug' => str($name)->slug(),
            'price' => rand(1000, 90000),
            'description' => $this->faker->sentence(10),
            'picture' =>  'https://fakeimg.pl/1000x1000/?text=Menu&font=noto'
        ];
    }
}

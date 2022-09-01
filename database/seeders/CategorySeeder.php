<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            ['name' => $name = 'Coffe', 'slug' => str($name)->slug()],
            ['name' => $name = 'Appetizer', 'slug' => str($name)->slug()],
            ['name' => $name = 'Non-Coffe', 'slug' => str($name)->slug()],
            ['name' => $name = 'Main Course', 'slug' => str($name)->slug()],
            ['name' => $name = 'Signature', 'slug' => str($name)->slug()],
        ])->each(fn ($q) => Category::create($q));
    }
}

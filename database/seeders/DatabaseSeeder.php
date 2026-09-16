<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Medicine::query()->firstOrCreate(
            ['brand_name' => 'Biogesic', 'quantity' => '500 mg'],
            [
                'generic_name' => 'Paracetamol',
                'category' => 'Pain Relief',
                'stock' => 48,
                'manufacturer' => 'Unilab',
                'expiry_date' => now()->addYear()->toDateString(),
                'description' => 'For the relief of minor aches and fever.',
            ],
        );
    }
}


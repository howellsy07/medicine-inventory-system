<?php

namespace Tests\Feature;

use App\Models\Medicine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MedicineApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_medicine_can_be_created_and_persisted(): void
    {
        $response = $this->postJson('/api/medicines', [
            'brand_name' => 'Biogesic',
            'generic_name' => 'Paracetamol',
            'category' => 'Pain Relief',
            'stock' => 24,
            'quantity' => '500 mg',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.brand_name', 'Biogesic');

        $this->assertDatabaseHas('medicines', [
            'brand_name' => 'Biogesic',
            'stock' => 24,
        ]);
    }

    public function test_required_fields_return_validation_errors(): void
    {
        $this->postJson('/api/medicines', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['brand_name', 'category', 'stock', 'quantity']);
    }

    public function test_medicine_list_and_details_are_available(): void
    {
        $medicine = Medicine::create([
            'brand_name' => 'Neozep',
            'category' => 'Cold Relief',
            'stock' => 10,
            'quantity' => '1 tablet',
        ]);

        $this->getJson('/api/medicines')->assertOk()->assertJsonCount(1, 'data');
        $this->getJson("/api/medicines/{$medicine->id}")
            ->assertOk()
            ->assertJsonPath('data.brand_name', 'Neozep');
    }
}


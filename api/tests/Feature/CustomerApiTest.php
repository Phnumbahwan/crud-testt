<?php

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->customer = Customer::factory()->create();
});

it('can retrieve a list of customers', function () {
    Customer::factory()->count(3)->create();

    $response = $this->getJson('/api/customers');

    $response->assertStatus(200)
        ->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'email',
                'phone',
                'created_at',
                'updated_at'
            ]
        ]);
});

it('can create a new customer', function () {
    $customerData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '1234567890'
    ];

    $response = $this->postJson('/api/customers', $customerData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'id',
            'name',
            'email',
            'phone',
            'created_at',
            'updated_at'
        ]);

    $this->assertDatabaseHas('customers', $customerData);
});

it('can show a specific customer', function () {
    $response = $this->getJson("/api/customers/{$this->customer->id}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'name',
            'email',
            'phone',
            'created_at',
            'updated_at'
        ])
        ->assertJson([
            'id' => $this->customer->id,
            'name' => $this->customer->name,
            'email' => $this->customer->email,
            'phone' => $this->customer->phone,
        ]);
});

it('can update a customer', function () {
    $updateData = [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'phone' => '9876543210'
    ];

    $response = $this->putJson("/api/customers/{$this->customer->id}", $updateData);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'name',
            'email',
            'phone',
            'created_at',
            'updated_at'
        ])
        ->assertJson([
            'name' => $updateData['name'],
            'email' => $updateData['email'],
            'phone' => $updateData['phone'],
        ]);

    $this->assertDatabaseHas('customers', $updateData);
});

it('can delete a customer', function () {
    $response = $this->deleteJson("/api/customers/{$this->customer->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('customers', [
        'id' => $this->customer->id
    ]);
});

it('returns 404 for non-existent customer', function () {
    $response = $this->getJson('/api/customers/99999');
    $response->assertStatus(404);
});

it('validates required fields when creating customer', function () {
    $response = $this->postJson('/api/customers', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'phone']);
});

it('validates required fields when updating customer', function () {
    $response = $this->putJson("/api/customers/{$this->customer->id}", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'email', 'phone']);
});

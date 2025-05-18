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
            'data' => [
                '*' => [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'contact_number',
                    'created_at',
                    'updated_at',
                ]
            ],
            'links'
        ]);

});

it('can create a new customer', function () {
    $customerData = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@example.com',
        'contact_number' => '1234567890'
    ];

    $response = $this->postJson('/api/customers', $customerData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'id',
            'first_name',
            'last_name',
            'email',
            'contact_number',
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
            'first_name',
            'last_name',
            'email',
            'contact_number',
            'created_at',
            'updated_at'
        ])
        ->assertJson([
            'id' => $this->customer->id,
            'first_name' => $this->customer->first_name,
            'last_name' => $this->customer->last_name,
            'email' => $this->customer->email,
            'contact_number' => $this->customer->contact_number,
        ]);
});

it('can update a customer', function () {
    $updateData = [
        'first_name' => 'Updated First Name',
        'last_name' => 'Updated Last Name',
        'email' => 'updated@example.com',
        'contact_number' => '9876543210'
    ];

    $response = $this->putJson("/api/customers/{$this->customer->id}", $updateData);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'id',
            'first_name',
            'last_name',
            'email',
            'contact_number',
            'created_at',
            'updated_at'
        ])
        ->assertJson([
            'first_name' => $updateData['first_name'],
            'last_name' => $updateData['last_name'],
            'email' => $updateData['email'],
            'contact_number' => $updateData['contact_number'],
        ]);

    $this->assertDatabaseHas('customers', $updateData);
});

it('can delete a customer', function () {
    $response = $this->deleteJson("/api/customers/{$this->customer->id}");

    $response->assertStatus(200);

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
        ->assertJsonValidationErrors(['first_name', 'last_name', 'email']);
});

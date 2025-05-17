<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\ElasticsearchService;

class Customer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'contact_number'
    ];

    protected static function booted()
    {
        static::saved(function ($customer) {
            app(ElasticsearchService::class)->create('customers', $customer->id, $customer->only('first_name', 'last_name', 'email', 'contact_number'));
        });

        static::deleted(function ($customer) {
            app(ElasticsearchService::class)->delete('customers', $customer->id);
        });
    }
}

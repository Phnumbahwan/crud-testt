<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ElasticsearchService
{
    protected string $host;

    public function __construct()
    {
        $this->host = config('services.elasticsearch.host');
    }

    public function create(string $index, string $id, array $data): array
    {
        return Http::put("{$this->host}/{$index}/_doc/{$id}", $data)->json();
    }

    public function delete(string $index, string $id): array
    {
        return Http::delete("{$this->host}/{$index}/_doc/{$id}")->json();
    }

    public function search(string $index, array $query): array
    {
        return Http::post("{$this->host}/{$index}/_search", $query)->json();
    }
}

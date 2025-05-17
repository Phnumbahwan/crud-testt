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

    public function search(string $index, array $query): array
    {
        return Http::post("{$this->host}/{$index}/_search", $query)->json();
    }
}

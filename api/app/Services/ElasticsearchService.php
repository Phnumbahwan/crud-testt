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

    public function indexDocument(string $index, string $id, array $data)
    {
        return Http::put("{$this->host}/{$index}/_doc/{$id}", $data)->json();
    }

    public function getDocument(string $index, string $id)
    {
        return Http::get("{$this->host}/{$index}/_doc/{$id}")->json();
    }

    public function search(string $index, array $query)
    {
        return Http::post("{$this->host}/{$index}/_search", $query)->json();
    }

    public function deleteDocument(string $index, string $id)
    {
        return Http::delete("{$this->host}/{$index}/_doc/{$id}")->json();
    }
}

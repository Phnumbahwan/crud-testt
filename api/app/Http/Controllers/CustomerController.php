<?php

namespace App\Http\Controllers;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Requests\ListCustomerRequest;
use App\Models\Customer;
use App\Services\ElasticsearchService;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListCustomerRequest $request, ElasticsearchService $es)
    {
        $perPage = $request->query('perPage', 5);
        $search = $request->query('search');
        $page = $request->query('page', 1);

        if ($search) {
            $query = [
                'from' => ($page - 1) * $perPage,
                'size' => $perPage,
                'query' => [
                    'multi_match' => [
                        'query' => $search,
                        'fields' => ['first_name', 'last_name', 'email']
                    ]
                ]
            ];

            $response = $es->search('customers', $query);
            $hits = collect($response['hits']['hits']);
            $ids = $hits->pluck('_id');
            $total = $response['hits']['total']['value'];

            $customers = Customer::whereIn('id', $ids)->get()
                ->sortBy(fn($model) => array_search($model->id, $ids->all()))
                ->values();

            return new LengthAwarePaginator(
                $customers,
                $total,
                $perPage,
                $page,
                ['path' => url()->current(), 'query' => $request->query()]
            );
        }

        return Customer::paginate($perPage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        return Customer::create($request->all());
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return $customer;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

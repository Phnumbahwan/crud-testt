import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getCustomers(page: number = 1, search: string = '', perPage: number = 5): Observable<PaginatedResponse<Customer>> {
        return this.http.get<PaginatedResponse<Customer>>(`${this.apiUrl}/customers`, {
            params: {
                page: page.toString(),
                search: search,
                per_page: perPage.toString()
            }
        });
    }

    createCustomer(customer: Omit<Customer, 'id'>) {
        return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
    }

    deleteCustomer(id: number) {
        return this.http.delete(`${this.apiUrl}/customers/${id}`);
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`);
    }
}
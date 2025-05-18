import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
    selector: 'app-view-customer',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Customer Details</h1>
                <button mat-button color="primary" (click)="goBack()">
                    <mat-icon>arrow_back</mat-icon>
                    Back to List
                </button>
            </div>

            <div *ngIf="customer" class="bg-white shadow-md rounded-lg p-6 max-w-2xl m-auto">
                <div class="grid grid-cols-2 gap-4">
                    
                    <div class="p-4">
                        <p class="text-gray-600">First Name</p>
                        <p class="font-medium">{{ customer.first_name }}</p>
                    </div>
                    
                    <div class="p-4">
                        <p class="text-gray-600">Last Name</p>
                        <p class="font-medium">{{ customer.last_name }}</p>
                    </div>
                    
                    <div class="p-4">
                        <p class="text-gray-600">Email</p>
                        <p class="font-medium">{{ customer.email }}</p>
                    </div>
                    
                    <div class="p-4">
                        <p class="text-gray-600">Contact Number</p>
                        <p class="font-medium">{{ customer.contact_number }}</p>
                    </div>

                    <div class="p-4">
                        <p class="text-gray-600">Created At</p>
                        <p class="font-medium">{{ customer.created_at | date:'medium' }}</p>
                    </div>

                    <div class="p-4">
                        <p class="text-gray-600">Updated At</p>
                        <p class="font-medium">{{ customer.updated_at | date:'medium' }}</p>
                    </div>
                </div>
            </div>

            <div *ngIf="!customer" class="text-center py-8">
                <p class="text-gray-600">Loading customer details...</p>
            </div>
        </div>
    `
})
export class ViewCustomerComponent implements OnInit {
    customer: Customer | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCustomer(Number(id));
        }
    }

    loadCustomer(id: number) {
        this.customerService.getCustomer(id).subscribe({
            next: (customer) => {
                this.customer = customer;
            },
            error: (error) => {
                console.error('Error loading customer:', error);
            }
        });
    }

    goBack() {
        this.router.navigate(['/']);
    }
} 
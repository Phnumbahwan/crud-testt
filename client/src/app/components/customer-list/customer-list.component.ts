import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn } from '../table/table.component';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
    selector: 'app-customer-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        TableComponent
    ],
    template: `
    <div class="container m-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">BASIC CRUD</h1>
      </div>

      <app-table 
        [columns]="columns" 
        [data]="data" 
        [itemsPerPage]="perPage"
        [total]="total"
        (onSort)="handleSort($event)"
        (onSearch)="handleSearch($event)"
        (onPageChange)="handlePageChange($event)">
      </app-table>
    </div>
  `
})
export class CustomerListComponent implements OnInit {
    columns: TableColumn[] = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'last_name', label: 'Last Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'contact_number', label: 'Contact Number', sortable: true }
    ];

    data: Customer[] = [];
    searchTerm: string = '';
    perPage: number = 5;
    currentPage: number = 1;
    total: number = 0;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.customerService.getCustomers(this.currentPage, this.searchTerm, this.perPage).subscribe({
            next: (response) => {
                this.data = response.data;
                this.total = response.total;
            },
            error: (error) => {
                console.error('Error loading users:', error);
            }
        });
    }

    handleSearch(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.currentPage = 1;
        this.loadUsers();
    }

    handlePageChange(event: { page: number; pageSize: number }) {
        this.currentPage = event.page;
        this.perPage = event.pageSize;
        this.loadUsers();
    }

    handleSort(event: { column: string; direction: 'asc' | 'desc' }) {
        console.log('Sort event:', event);
    }
} 
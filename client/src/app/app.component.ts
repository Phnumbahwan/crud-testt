import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent, TableColumn } from './components/table/table.component';
import { CustomerService, Customer } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

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

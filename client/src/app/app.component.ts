import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent, TableColumn } from './components/table/table.component';
import { UserService, User } from './services/user.service';
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

  data: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.data = response.data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  handleSort(event: { column: string; direction: 'asc' | 'desc' }) {
    console.log('Sort event:', event);
  }
}

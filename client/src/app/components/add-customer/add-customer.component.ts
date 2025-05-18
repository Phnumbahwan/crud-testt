import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container m-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Add New Customer</h1>
        <button mat-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to List
        </button>
      </div>

      <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="max-w-4xl flex flex-row gap-4">
        <mat-form-field appearance="fill">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="first_name" required>
          <mat-error *ngIf="customerForm.get('first_name')?.hasError('required')">
            First name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="last_name" required>
          <mat-error *ngIf="customerForm.get('last_name')?.hasError('required')">
            Last name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" required type="email">
          <mat-error *ngIf="customerForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="customerForm.get('email')?.hasError('email')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Contact Number</mat-label>
          <input matInput formControlName="contact_number" required>
          <mat-error *ngIf="customerForm.get('contact_number')?.hasError('required')">
            Contact number is required
          </mat-error>
        </mat-form-field>

        <div class="flex justify-end mt-4">
          <button mat-raised-button color="primary" type="submit" [disabled]="customerForm.invalid">
            Add Customer
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class AddCustomerComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.createCustomer(this.customerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating customer:', error);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 
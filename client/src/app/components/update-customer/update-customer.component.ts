import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-update-customer',
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
        <h1 class="text-2xl font-bold">Update Customer</h1>
        <button mat-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Details
        </button>
      </div>

      <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="max-w-4xl flex flex-col gap-4 m-auto">
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
          <input matInput formControlName="contact_number">
          <mat-error *ngIf="customerForm.get('contact_number')?.hasError('required')">
            Contact number is required
          </mat-error>
        </mat-form-field>

        <div class="flex justify-end mt-4 m-auto">
          <button mat-raised-button color="primary" type="submit" [disabled]="customerForm.invalid">
            Update Customer
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
export class UpdateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['']
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { customer: Customer };

    if (state?.customer) {
      this.customerId = state.customer.id;
      this.customerForm.patchValue({
        first_name: state.customer.first_name,
        last_name: state.customer.last_name,
        email: state.customer.email,
        contact_number: state.customer.contact_number
      });
    } else {
      // Fallback to API call if state is not available
      this.customerId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.customerId) {
        this.loadCustomer(this.customerId);
      }
    }
  }

  loadCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          contact_number: customer.contact_number
        });
      },
      error: (error: Error) => {
        console.error('Error loading customer:', error);
      }
    });
  }

  onSubmit() {
    if (this.customerForm.valid && this.customerId) {
      this.customerService.updateCustomer(this.customerId, this.customerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/view', this.customerId]);
        },
        error: (error: Error) => {
          console.error('Error updating customer:', error);
        }
      });
    }
  }

  goBack() {
    if (this.customerId) {
      this.router.navigate(['/view', this.customerId]);
    } else {
      this.router.navigate(['/']);
    }
  }
} 
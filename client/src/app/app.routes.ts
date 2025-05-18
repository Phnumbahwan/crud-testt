import { Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

export const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'add', component: AddCustomerComponent }
];

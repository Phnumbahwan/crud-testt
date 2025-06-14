import { Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

export const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'add', component: AddCustomerComponent },
    { path: 'view/:id', component: ViewCustomerComponent },
    { path: 'update/:id', component: UpdateCustomerComponent }
];

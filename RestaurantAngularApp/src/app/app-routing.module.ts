import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';
import { CustomerComponent } from './components/customer/add-customer/add-customer.component';
import { UpdateCustomersComponent } from './components/customer/update-customers/update-customers.component';
import { AddCustomerDialogComponent } from './components/dialogs/add-customer-dialog/add-customer-dialog.component';
import { AddMenuDialogComponent } from './components/dialogs/add-menu-dialog/add-menu-dialog.component';
import { AddOrderDialogComponent } from './components/dialogs/add-order-dialog/add-order-dialog.component';
import { AddTableDialogComponent } from './components/dialogs/add-table-dialog/add-table-dialog.component';
import { AddWaiterDialogComponent } from './components/dialogs/add-waiter-dialog/add-waiter-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MenusComponent } from './components/menus/add-menus/add-menus.component';
import { UpdateMenusComponent } from './components/menus/update-menus/update-menus.component';
import { OrdersComponent } from './components/orders/add-orders/add-orders.component';
import { UpdateOrdersComponent } from './components/orders/update-orders/update-orders.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './components/tables/add/add.component';
import { UpdateTablesComponent } from './components/tables/update/update.component';
import { WaitersComponent } from './components/waiters/add-waiters/add-waiters.component';
import { UpdateWaitersComponent } from './components/waiters/update-waiters/update-waiters.component';

const routes: Routes = [
  {
    path: 'tables',
    component: TableComponent,
  },
  {
    path: 'tables/add',
    component: AddTableDialogComponent,
  },
  {
    path: 'tables/update/:id',
    component: UpdateTablesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/add',
    component: AddOrderDialogComponent,
  },
  {
    path: 'orders/update/:id',
    component: UpdateOrdersComponent,
  },
  {
    path: 'customers',
    component: CustomerComponent,
  },
  {
    path: 'customers/add',
    component: AddCustomerDialogComponent,
  },
  {
    path: 'customers/update/:id',
    component: UpdateCustomersComponent,
  },
  {
    path: 'waiters',
    component: WaitersComponent,
  },
  {
    path: 'waiters/add',
    component: AddWaiterDialogComponent,
  },
  {
    path: 'waiters/update/:id',
    component: UpdateWaitersComponent,
  },
  {
    path: 'menus',
    component: MenusComponent,
  },
  {
    path: 'menus/add',
    component: AddMenuDialogComponent,
  },
  {
    path: 'menus/update/:id',
    component: UpdateMenusComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'auth/confirm',
    component: ConfirmUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

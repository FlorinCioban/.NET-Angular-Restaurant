import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';
import { AddTableDialogComponent } from './components/dialogs/add-table-dialog/add-table-dialog.component';
import { DeleteConfirmationDialogComponent } from './components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './components/tables/add/add.component';
import { UpdateTablesComponent } from './components/tables/update/update.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OrdersComponent } from './components/orders/add-orders/add-orders.component';
import { UpdateOrdersComponent } from './components/orders/update-orders/update-orders.component';
import { AddOrderDialogComponent } from './components/dialogs/add-order-dialog/add-order-dialog.component';
import { CustomerComponent } from './components/customer/add-customer/add-customer.component';
import { AddCustomerDialogComponent } from './components/dialogs/add-customer-dialog/add-customer-dialog.component';
import { UpdateCustomersComponent } from './components/customer/update-customers/update-customers.component';
import { WaitersComponent } from './components/waiters/add-waiters/add-waiters.component';
import { AddWaiterDialogComponent } from './components/dialogs/add-waiter-dialog/add-waiter-dialog.component';
import { UpdateWaitersComponent } from './components/waiters/update-waiters/update-waiters.component';
import { MenusComponent } from './components/menus/add-menus/add-menus.component';
import { UpdateMenusComponent } from './components/menus/update-menus/update-menus.component';
import { AddMenuDialogComponent } from './components/dialogs/add-menu-dialog/add-menu-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UpdateTablesComponent,
    DeleteConfirmationDialogComponent,
    AddTableDialogComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmUserComponent,
    OrdersComponent,
    UpdateOrdersComponent,
    AddOrderDialogComponent,
    CustomerComponent,
    AddCustomerDialogComponent,
    UpdateCustomersComponent,
    WaitersComponent,
    AddWaiterDialogComponent,
    UpdateWaitersComponent,
    MenusComponent,
    UpdateMenusComponent,
    AddMenuDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

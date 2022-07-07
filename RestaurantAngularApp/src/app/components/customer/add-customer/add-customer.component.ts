import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { AddCustomerDialogComponent } from '../../dialogs/add-customer-dialog/add-customer-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateCustomersComponent } from '../update-customers/update-customers.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  public customers: Customer[] = [];
  public updateCustomerGroup: Customer = {};
  public phoneNumberFilter = new FormControl('');

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'actions',
  ];

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  private getCustomer() {
    this.customerService.getCustomer().subscribe((customer) => {
      this.customers = [...customer];
    });
  }

  public addCustomer() {
    this.dialog
      .open(AddCustomerDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.customerService.addCustomer(result).subscribe(() => {
            this.getCustomer();
          });
        }
      });
  }

  public updateCustomer(customer: Customer) {
    this.dialog
      .open(UpdateCustomersComponent, {
        data: customer,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.id = customer.id;
          result.phoneNumber = Number(result.phoneNumber);
          this.customerService.updateCustomer(result).subscribe(() => {
            this.getCustomer();
          });
        }
        this.router.navigate(['/customers/edit', customer.id]);
      });
  }

  public deleteCustomer(id: number) {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        console.log('result --> ', result);
        if (result) {
          this.customerService.deleteCustomer(id).subscribe((value) => {
            this.getCustomer();
          });
        }
      });
  }

  public selectItem(customer: Customer) {
    this.updateCustomerGroup = customer;
  }

  public handleFilterChange() {
    this.customerService
      .filterCustomer(this.phoneNumberFilter.value)
      .subscribe((value) => {
        this.customers = value;
      });
  }

  goToAddPage() {
    this.router.navigate(['customers/add']);
  }

  goToEditPage(customerId: number) {
    console.log('-->', customerId);
    this.router.navigate(['customers/update', customerId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss'],
})
export class AddCustomerDialogComponent implements OnInit {
  constructor(
    private customersService: CustomerService,
    private _snackBar: MatSnackBar
  ) {}

  public _customerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this._customerFormGroup.value);
  }
  get firstName() {
    return this._customerFormGroup.get('firstName');
  }
  get lastName() {
    return this._customerFormGroup.get('lastName');
  }
  get phoneNumber() {
    return this._customerFormGroup.get('phoneNumber');
  }

  onSubmit() {
    this.customersService
      .addCustomer(this._customerFormGroup.value)
      .subscribe((table) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._customerFormGroup.reset();
      });
  }

  public addCustomer() {
    this.customersService
      .addCustomer(this._customerFormGroup.value)
      .subscribe((getCustomerById) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._customerFormGroup.reset();
      });
  }
}

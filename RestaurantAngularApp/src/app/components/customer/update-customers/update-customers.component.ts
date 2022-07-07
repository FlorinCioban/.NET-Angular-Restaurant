import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customers',
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.scss'],
})
export class UpdateCustomersComponent implements OnInit {
  itemId: number | undefined;
  constructor(
    private customersService: CustomerService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public _customerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
  });

  get firstName() {
    return this._customerFormGroup.get('firstName');
  }
  get lastName() {
    return this._customerFormGroup.get('lastName');
  }
  get phoneNumber() {
    return this._customerFormGroup.get('phoneNumber');
  }

  ngOnInit(): void {
    console.log(this._customerFormGroup.value);
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.customersService.getCustomerById(itemId).subscribe((item) => {
      this._customerFormGroup.patchValue(item);
    });
  }

  onSubmit() {
    this.customersService
      .updateCustomer({
        id: this.itemId,
        firstName: this._customerFormGroup.value.firstName,
        lastName: this._customerFormGroup.value.lastName,
        phoneNumber: this._customerFormGroup.value.phoneNumber,
      })
      .subscribe((table) => {
        this._snackBar.open('Updated succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._customerFormGroup.reset();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/services/orders.services';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss'],
})
export class AddOrderDialogComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private _snackBar: MatSnackBar
  ) {}

  public _orderFormGroup = new FormGroup({
    orderDate: new FormControl(''),
    status: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    console.log(this._orderFormGroup.value);
  }
  get dateOrder() {
    return this._orderFormGroup.get('dateOrder');
  }
  get status() {
    return this._orderFormGroup.get('status');
  }

  onSubmit() {
    this.ordersService
      .addOrderItem(this._orderFormGroup.value)
      .subscribe((order) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._orderFormGroup.reset();
      });
  }

  public addTable() {
    this.ordersService
      .addOrderItem(this._orderFormGroup.value)
      .subscribe((getOrderById) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._orderFormGroup.reset();
      });
  }
}

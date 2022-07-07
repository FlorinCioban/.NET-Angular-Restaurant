import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.services';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.scss'],
})
export class UpdateOrdersComponent implements OnInit {
  itemId: number | undefined;
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public _orderFormGroup = new FormGroup({
    orderDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  get orderDate() {
    return this._orderFormGroup.get('orderDate');
  }
  get status() {
    return this._orderFormGroup.get('status');
  }

  ngOnInit(): void {
    console.log(this._orderFormGroup.value);
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.ordersService.getOrderById(itemId).subscribe((item) => {
      this._orderFormGroup.patchValue(item);
    });
  }

  onSubmit() {
    this.ordersService
      .updateOrder({
        id: this.itemId,
        orderDate: this._orderFormGroup.value.orderDate,
        status: this._orderFormGroup.value.status,
      })
      .subscribe((table) => {
        this._snackBar.open('Updated succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._orderFormGroup.reset();
      });
  }
}

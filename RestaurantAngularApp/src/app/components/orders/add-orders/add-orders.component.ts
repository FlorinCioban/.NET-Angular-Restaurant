import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/services/orders.services';
import { AddOrderDialogComponent } from '../../dialogs/add-order-dialog/add-order-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateOrdersComponent } from '../update-orders/update-orders.component';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];
  public updateOrderGroup: Order = {};
  public dateFilter = new FormControl('');

  public displayedColumns: string[] = ['orderDate', 'status', 'actions'];

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = [...orders];
    });
  }

  public addOrder() {
    this.dialog
      .open(AddOrderDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.orderDate = new Date(result.orderDate as string);
          this.ordersService.addOrderItem(result).subscribe(() => {
            this.getOrders();
          });
        }
      });
  }

  public updateOrder(order: Order) {
    this.dialog
      .open(UpdateOrdersComponent, {
        data: order,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.id = order.id;
          this.ordersService.updateOrder(result).subscribe(() => {
            this.getOrders();
          });
        }
        this.router.navigate(['/orders/edit', order.id]);
      });
  }

  public deleteOrder(id: number) {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        console.log('result --> ', result);
        if (result) {
          this.ordersService.deleteOrder(id).subscribe((value) => {
            this.getOrders();
          });
        }
      });
  }

  public selectItem(order: Order) {
    this.updateOrderGroup = order;
  }

  public handleFilterChange() {
    console.log({
      'this.dateFilter.value': this.dateFilter.value,
      'new Date(this.dateFilter.value)': new Date(this.dateFilter.value),
    });
    const dateFilter = this.dateFilter.value
      ? new Date(this.dateFilter.value).toISOString()
      : '';

    this.ordersService.filterOrders(dateFilter).subscribe((value) => {
      this.orders = value;
    });
  }

  public formatToLocalDate(orderDate: string) {
    return new Date(`${orderDate}.000Z`).toLocaleString();
  }

  goToAddPage() {
    this.router.navigate(['orders/add']);
  }

  goToEditPage(orderId: number) {
    console.log('-->', orderId);
    this.router.navigate(['orders/update', orderId]);
  }
}

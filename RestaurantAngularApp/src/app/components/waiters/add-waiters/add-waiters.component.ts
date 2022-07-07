import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Waiter } from 'src/app/models/Waiter';
import { WaitersService } from 'src/app/services/waiters.service';
import { AddWaiterDialogComponent } from '../../dialogs/add-waiter-dialog/add-waiter-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateWaitersComponent } from '../update-waiters/update-waiters.component';

@Component({
  selector: 'app-add-waiters',
  templateUrl: './add-waiters.component.html',
  styleUrls: ['./add-waiters.component.scss'],
})
export class WaitersComponent implements OnInit {
  public waiters: Waiter[] = [];
  public updateWaiterGroup: Waiter = {};
  public salaryFilter = new FormControl('');

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'salary',
    'actions',
  ];

  constructor(
    private waitersService: WaitersService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWaiter();
  }

  private getWaiter() {
    this.waitersService.getWaiters().subscribe((waiter) => {
      this.waiters = [...waiter];
    });
  }

  public addWaiter() {
    this.dialog
      .open(AddWaiterDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.waitersService.addWaiter(result).subscribe(() => {
            this.getWaiter();
          });
        }
      });
  }

  public updateWaiter(waiter: Waiter) {
    this.dialog
      .open(UpdateWaitersComponent, {
        data: waiter,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.id = waiter.id;
          result.salary = Number(result.salary);
          this.waitersService.updateWaiter(result).subscribe(() => {
            this.getWaiter();
          });
        }
        this.router.navigate(['/waiters/edit', waiter.id]);
      });
  }

  public deleteWaiter(id: number) {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        console.log('result --> ', result);
        if (result) {
          this.waitersService.deleteWaiter(id).subscribe((value) => {
            this.getWaiter();
          });
        }
      });
  }

  public selectItem(waiter: Waiter) {
    this.updateWaiterGroup = waiter;
  }

  public handleFilterChange() {
    this.waitersService
      .filterWaiter(this.salaryFilter.value)
      .subscribe((value) => {
        this.waiters = value;
      });
  }

  goToAddPage() {
    this.router.navigate(['waiters/add']);
  }

  goToEditPage(waiterId: number) {
    console.log('-->', waiterId);
    this.router.navigate(['waiters/update', waiterId]);
  }
}

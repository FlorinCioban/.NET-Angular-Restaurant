import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/Table';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TablesService } from 'src/app/services/tables.service';
import { AddTableDialogComponent } from '../../dialogs/add-table-dialog/add-table-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateTablesComponent } from '../update/update.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class TableComponent implements OnInit {
  public tables: Table[] = [];
  public updateTableGroup: Table = {};
  public seatsFilter = new FormControl('');

  // public dateFilter?: string;
  // public nrOfHoursFilter?: number;
  public displayedColumns: string[] = ['seats', 'status', 'actions'];

  constructor(
    private tablesService: TablesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTables();
  }

  private getTables() {
    this.tablesService.getTables().subscribe((tables) => {
      this.tables = [...tables];
    });
  }

  public addTable() {
    this.dialog
      .open(AddTableDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.date = new Date(result.date as string);
          this.tablesService.addTable(result).subscribe(() => {
            this.getTables();
          });
        }
      });
  }

  public updateTable(table: Table) {
    this.dialog
      .open(UpdateTablesComponent, {
        data: table,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          result.id = table.id;
          result.seats = Number(result.seats);
          this.tablesService.updateTable(result).subscribe(() => {
            this.getTables();
          });
        }
        this.router.navigate(['/tables/edit', table.id]);
      });
  }

  public deleteTable(id: number) {
    this.dialog
      .open(DeleteConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        console.log('result --> ', result);
        if (result) {
          this.tablesService.deleteTable(id).subscribe((value) => {
            this.getTables();
          });
        }
      });
  }

  public selectItem(table: Table) {
    this.updateTableGroup = table;
  }

  public handleFilterChange() {
    // console.log({
    //   'this.dateFilter.value': this.dateFilter.value,
    //   'new Date(this.dateFilter.value)': new Date(this.dateFilter.value),
    // });
    // const dateFilter = this.dateFilter.value
    //   ? new Date(this.dateFilter.value).toISOString()
    //   : '';

    this.tablesService
      .filterTable(this.seatsFilter.value)
      .subscribe((value) => {
        this.tables = value;
      });
  }

  // public formatToLocalDate(date: string) {
  //   return new Date(`${date}.000Z`).toLocaleString();
  // }

  goToAddPage() {
    this.router.navigate(['tables/add']);
  }

  goToEditPage(tableId: number) {
    console.log('-->', tableId);
    this.router.navigate(['tables/update', tableId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-add-table-dialog',
  templateUrl: './add-table-dialog.component.html',
  styleUrls: ['./add-table-dialog.component.scss'],
})
export class AddTableDialogComponent implements OnInit {
  constructor(
    private tableService: TablesService,
    private _snackBar: MatSnackBar
  ) {}

  public _tableFormGroup = new FormGroup({
    seats: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    console.log(this._tableFormGroup.value);
  }
  get seats() {
    return this._tableFormGroup.get('seats');
  }
  get status() {
    return this._tableFormGroup.get('status');
  }

  onSubmit() {
    this.tableService
      .addTable(this._tableFormGroup.value)
      .subscribe((table) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._tableFormGroup.reset();
      });
  }

  public addTable() {
    this.tableService
      .addTable(this._tableFormGroup.value)
      .subscribe((getTableById) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._tableFormGroup.reset();
      });
  }
}

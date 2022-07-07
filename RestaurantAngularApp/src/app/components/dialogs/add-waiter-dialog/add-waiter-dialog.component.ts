import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WaitersService } from 'src/app/services/waiters.service';

@Component({
  selector: 'app-add-waiter-dialog',
  templateUrl: './add-waiter-dialog.component.html',
  styleUrls: ['./add-waiter-dialog.component.scss'],
})
export class AddWaiterDialogComponent implements OnInit {
  constructor(
    private waitersService: WaitersService,
    private _snackBar: MatSnackBar
  ) {}

  public _waiterFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    salary: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this._waiterFormGroup.value);
  }
  get firstName() {
    return this._waiterFormGroup.get('firstName');
  }
  get lastName() {
    return this._waiterFormGroup.get('lastName');
  }
  get salary() {
    return this._waiterFormGroup.get('salary');
  }

  onSubmit() {
    this.waitersService
      .addWaiter(this._waiterFormGroup.value)
      .subscribe((table) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._waiterFormGroup.reset();
      });
  }

  public addWaiter() {
    this.waitersService
      .addWaiter(this._waiterFormGroup.value)
      .subscribe((getWaiterById) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._waiterFormGroup.reset();
      });
  }
}

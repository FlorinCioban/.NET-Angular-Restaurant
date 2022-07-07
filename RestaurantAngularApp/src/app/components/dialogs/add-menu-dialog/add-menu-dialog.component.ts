import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-add-menu-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.scss'],
})
export class AddMenuDialogComponent implements OnInit {
  constructor(
    private menusService: MenusService,
    private _snackBar: MatSnackBar
  ) {}

  public _menuFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    preparationTime: new FormControl(''),
    price: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this._menuFormGroup.value);
  }
  get name() {
    return this._menuFormGroup.get('name');
  }
  get details() {
    return this._menuFormGroup.get('details');
  }
  get preparationTime() {
    return this._menuFormGroup.get('preparationTime');
  }
  get price() {
    return this._menuFormGroup.get('price');
  }

  onSubmit() {
    this.menusService.addMenu(this._menuFormGroup.value).subscribe((table) => {
      this._snackBar.open('Added succesfully', 'OK', {
        verticalPosition: 'top',
        duration: 2000,
      });
      this._menuFormGroup.reset();
    });
  }

  public addCustomer() {
    this.menusService
      .addMenu(this._menuFormGroup.value)
      .subscribe((getWaiterById) => {
        this._snackBar.open('Added succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._menuFormGroup.reset();
      });
  }
}

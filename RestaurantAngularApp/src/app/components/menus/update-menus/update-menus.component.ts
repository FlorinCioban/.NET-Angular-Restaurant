import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-update-menus',
  templateUrl: './update-menus.component.html',
  styleUrls: ['./update-menus.component.scss'],
})
export class UpdateMenusComponent implements OnInit {
  itemId: number | undefined;
  constructor(
    private menusService: MenusService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public _menuFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    preparationTime: new FormControl(''),
    price: new FormControl(''),
  });

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

  ngOnInit(): void {
    console.log(this._menuFormGroup.value);
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.menusService.getMenuById(itemId).subscribe((item) => {
      this._menuFormGroup.patchValue(item);
    });
  }

  onSubmit() {
    this.menusService
      .updateMenu({
        id: this.itemId,
        name: this._menuFormGroup.value.name,
        details: this._menuFormGroup.value.details,
        preparationTime: this._menuFormGroup.value.preparationTime,
        price: this._menuFormGroup.value.price,
      })
      .subscribe((table) => {
        this._snackBar.open('Updated succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._menuFormGroup.reset();
      });
  }
}

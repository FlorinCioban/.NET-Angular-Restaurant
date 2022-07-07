import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { WaitersService } from 'src/app/services/waiters.service';

@Component({
  selector: 'app-update-waiters',
  templateUrl: './update-waiters.component.html',
  styleUrls: ['./update-waiters.component.scss'],
})
export class UpdateWaitersComponent implements OnInit {
  itemId: number | undefined;
  constructor(
    private waitersService: WaitersService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public _waiterFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    salary: new FormControl(''),
  });

  get firstName() {
    return this._waiterFormGroup.get('firstName');
  }
  get lastName() {
    return this._waiterFormGroup.get('lastName');
  }
  get salary() {
    return this._waiterFormGroup.get('salary');
  }

  ngOnInit(): void {
    console.log(this._waiterFormGroup.value);
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.waitersService.getWaiterById(itemId).subscribe((item) => {
      this._waiterFormGroup.patchValue(item);
    });
  }

  onSubmit() {
    this.waitersService
      .updateWaiter({
        id: this.itemId,
        firstName: this._waiterFormGroup.value.firstName,
        lastName: this._waiterFormGroup.value.lastName,
        salary: this._waiterFormGroup.value.salary,
      })
      .subscribe((table) => {
        this._snackBar.open('Updated succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._waiterFormGroup.reset();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateTablesComponent implements OnInit {
  itemId: number | undefined;
  constructor(
    private tablesService: TablesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public _tableFormGroup = new FormGroup({
    seats: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  get seats() {
    return this._tableFormGroup.get('seats');
  }
  get status() {
    return this._tableFormGroup.get('status');
  }

  ngOnInit(): void {
    console.log(this._tableFormGroup.value);
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.tablesService.getTableById(itemId).subscribe((item) => {
      this._tableFormGroup.patchValue(item);
    });
  }

  onSubmit() {
    //console.log("onSubmit--->", this._timeTrackingFormGroup.value);
    this.tablesService
      .updateTable({
        id: this.itemId,
        seats: this._tableFormGroup.value.seats,
        status: this._tableFormGroup.value.status,
      })
      .subscribe((table) => {
        this._snackBar.open('Updated succesfully', 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
        this._tableFormGroup.reset();
      });
  }
}

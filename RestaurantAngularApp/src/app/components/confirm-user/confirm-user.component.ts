import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss'],
})
export class ConfirmUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public authService: AuthenticationService
  ) {}

  confirmForm = this.formBuilder.group({
    username: ['', [Validators.required]],
  });

  get username() {
    return this.confirmForm.get('username');
  }

  ngOnInit(): void {}

  onConfirmClicked() {
    this.authService.confirmAccount(this.confirmForm.value).subscribe(
      (userInfo) => {
        this._snackBar.open('Account confirmed!', 'Ok', {
          verticalPosition: 'top',
          duration: 4 * 1000,
        });
        this.confirmForm.reset();
        //window.location.reload();
      },
      (error) => {
        console.log(error);
        this._snackBar.open('This username does not exist!', 'Ok', {
          verticalPosition: 'top',
          duration: 4 * 1000,
        });
      }
    );
  }
}

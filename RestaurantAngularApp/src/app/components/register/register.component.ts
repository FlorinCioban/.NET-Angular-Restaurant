import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    email: [''],
    firstName: [''],
    lastName: [''],
  });
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get isConfirmed() {
    return this.registerForm.get('isConfirmed');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get createdAt() {
    return this.registerForm.get('createdAt');
  }

  onRegisterClicked() {
    this.authService.register(this.registerForm.value).subscribe(
      (userInfo) => {
        this._snackBar.open('Registration successful!', 'Ok', {
          verticalPosition: 'top',
          duration: 4 * 1000,
        });
        this.registerForm.reset();
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Registration failed: ' + error.error, 'Ok', {
          verticalPosition: 'top',
          duration: 4 * 1000,
        });
      }
    );
  }

  ngOnInit(): void {}
}

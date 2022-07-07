import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      router.navigate(['/timetrackingitems']);
    }
  }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.minLength(6)]],
  });
  get password() {
    return this.loginForm.get('password');
  }
  get username() {
    return this.loginForm.get('username');
  }

  onLoginClicked() {
    this.authService.login(this.loginForm.value).subscribe(
      (tokenObj) => {
        localStorage.setItem('token', tokenObj.token);
        this._snackBar.open('Login successful!', 'Ok', {
          verticalPosition: 'top',
          duration: 6 * 1000,
        });

        this.loginForm.reset();
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Login failed: ' + error.error, 'Ok', {
          verticalPosition: 'top',
          duration: 6 * 1000,
        });
      }
    );
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { AuthenticationResponseConstants } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/authentication.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted = false;
  failedToLogin = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private popupNotificationService: PopupNotificationsService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],
    });
  }

      // convenience getter for easy access to form fields
  get formControls() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    const user = {
      username: this.registerForm.value['username'],
      password: this.registerForm.value['password'],
      email: null
    } as User;

    this.authService.login(user).subscribe({
      next: (response) => {
        this.popupNotificationService.showResponse(response);

        if (response.message === AuthenticationResponseConstants.SUCCESSFULLY_LOGGED_IN) {
          this.authService.isLoggedIn = true;
        } else if (response.message === AuthenticationResponseConstants.SUCCESSFULLY_LOGGED_IN_AS_ADMIN) {
          this.authService.isLoggedIn = true;
          this.authService.isAdmin = true;
        }

        this.router.navigate(['/home']);
      }, error: (error) => {
        this.failedToLogin = true;
        this.popupNotificationService.showResponse(error);
      }, complete: () => {console.info('complete')}
    })
  }
}

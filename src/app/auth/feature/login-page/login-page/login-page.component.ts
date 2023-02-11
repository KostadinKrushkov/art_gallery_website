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
  public loginForm: FormGroup | any;
  public submitted = false;
  public failedToLogin = false;
  public siteKey: string = '6Lfu-WYkAAAAAGzn54L1sUWnYN3Vbb2dkn99h-dF';

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private popupNotificationService: PopupNotificationsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],
        recaptcha: ['', Validators.required]
      });
  }

      // convenience getter for easy access to form fields
  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    const user = {
      username: this.loginForm.value['username'],
      password: this.loginForm.value['password'],
      email: null
    } as User;

    const recaptcha = this.loginForm.value['recaptcha'];
    if (!this.authService.login(user, recaptcha) || this.loginForm.invalid) {
        this.router.navigate(['/home']);
    }
  }
}

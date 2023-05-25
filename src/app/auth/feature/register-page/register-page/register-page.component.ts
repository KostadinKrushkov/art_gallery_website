import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { MustMatch } from 'src/app/auth/utils/validators';
import { KeyConstants } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/authentication.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';


function passwordValidator(control: FormControl) {
  let password = control.value;
  let hasNumberRegex = /\d/;
  let hasSpecialCharRegex = /\W/;

  const hasNumber = hasNumberRegex.test(password);
  const hasSpecialChar = hasSpecialCharRegex.test(password);

  if (password.length > RegisterPageComponent.minPasswordLength && hasNumber && hasSpecialChar) {
    return null
  }

  return {hasError: true};
}

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  public static minPasswordLength = 10;
  public registerForm: FormGroup | any;
  public submitted = false;
  public siteKey = KeyConstants.siteKey;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private loadingSpinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['test', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordValidator, Validators.minLength(RegisterPageComponent.minPasswordLength), ]],
        confirmPassword: ['', Validators.required],
        recaptcha: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }


  isPasswordValid() {
    let password = this.registerForm.value['password'];
    let hasNumber = /\d/;
    let hasSpecialChar = /\W/;
    return password.length > RegisterPageComponent.minPasswordLength && hasNumber.test(password) && hasSpecialChar.test(password);
  }

  get form() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    const user = {
      username: this.registerForm.value['username'],
      password: this.registerForm.value['password'],
      email: this.registerForm.value['email'],
    } as User

    const recaptcha = this.registerForm.value['recaptcha'];
    this.authService.register(user, recaptcha);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}

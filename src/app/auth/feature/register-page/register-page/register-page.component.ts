import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { MustMatch } from 'src/app/auth/utils/validators';
import { User } from 'src/app/shared/models/authentication.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';


function passwordValidator(control: FormControl) {
  let password = control.value;
  var number = /\d/;

  const hasNumber = number.test(password);

  if (password.length > RegisterPageComponent.minPasswordLength && hasNumber) {
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
  public siteKey: string = '6Lfu-WYkAAAAAGzn54L1sUWnYN3Vbb2dkn99h-dF';

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private popupNotificationService: PopupNotificationsService) { }

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
    var hasNumber = /\d/;
    // TODO find out how to add the special character check as well
    return password.length > RegisterPageComponent.minPasswordLength && hasNumber.test(password);
  }

  // convenience getter for easy access to form fields
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

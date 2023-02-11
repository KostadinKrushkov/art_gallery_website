import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';

const routes: Route[] = [
  {
    path: '', component: LoginPageComponent
  }
]

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ]
})
export class LoginPageModule { }

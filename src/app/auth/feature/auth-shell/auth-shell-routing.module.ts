import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }, {
    path: 'register',
    loadChildren: () =>
      import('../register-page/register-page.module').then(
        (m) => m.RegisterPageModule
      ),
  }, {
    path: 'login',
    loadChildren: () =>
      import('../login-page/login-page.module').then(
        (m) => m.LoginPageModule
    ),
  }, {
    path: 'logout',
    loadChildren: () =>
      import('../logout/logout.module').then(
        (m) => m.LogoutModule
    ),
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: []
})
export class AuthRoutingModule { }

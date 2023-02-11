import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from '../../data-access/authentication-guard.service';
import { AuthenticationRoleConstants } from 'src/app/shared/constants/constants';

const routes: Route[] = [
  {
    path: '', component: LogoutComponent,
    canActivate: [AuthenticationGuardService],
    data: {
      role: [AuthenticationRoleConstants.ADMIN_ROLE, AuthenticationRoleConstants.USER_ROLE]
    },
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LogoutModule {}

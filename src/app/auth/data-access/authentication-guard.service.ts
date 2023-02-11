import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationResponseConstants } from 'src/app/shared/constants/constants';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(public authenticationService: AuthenticationService, public router: Router, private popupNotificationService: PopupNotificationsService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authenticationService.isAuthenticated()) {
      const userRole = this.authenticationService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.rerouteAndNotifyUser();
        return false;
      }
      return true;
    }

    this.rerouteAndNotifyUser();
    return false;
  }

  rerouteAndNotifyUser() {
    this.popupNotificationService.showErrorMessage(AuthenticationResponseConstants.NEED_TO_LOGIN_AS_ADMIN_BEFORE_CUD_OPS);
    this.router.navigate(['/auth/login']);
  }
}

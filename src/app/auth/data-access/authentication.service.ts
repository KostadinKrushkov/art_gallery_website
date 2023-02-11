import { Injectable } from '@angular/core';
import { AuthenticationResponseConstants, AuthenticationRoleConstants, ServerConfigConstants } from 'src/app/shared/constants/constants';
import { BaseHttpService } from 'src/app/shared/data-access/base-http.service';
import { AuthenticationResponse, User } from 'src/app/shared/models/authentication.models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseHttpService {
  private role: string | null = null;
  public isLoggedIn = false;

  constructor(public override http: HttpClient, public jwtHelper: JwtHelperService, private popupNotificationService: PopupNotificationsService, private router: Router) {
    super(http);
  }

  login(user: User, recaptcha: string) {
      var params = {user: user, recaptcha: recaptcha};
      return this.post<AuthenticationResponse>(ServerConfigConstants.BACKEND_ADDRESS + '/auth/login', params).subscribe({
        next: (response) => {
          this.popupNotificationService.showResponse(response);
          if (response.message === AuthenticationResponseConstants.SUCCESSFULLY_LOGGED_IN) {
            localStorage.setItem('ROLE', AuthenticationRoleConstants.USER_ROLE);
          } else if (response.message === AuthenticationResponseConstants.SUCCESSFULLY_LOGGED_IN_AS_ADMIN) {
            localStorage.setItem('ROLE', AuthenticationRoleConstants.ADMIN_ROLE);
          }

          this.isLoggedIn = true;
          this.router.navigate(['/home']);
          return true;
        }, error: (error) => {
          this.popupNotificationService.showResponse(error);
          return false;
        }, complete: () => {}
      })
    }

  register(user: User, recaptcha: string) {
    let params = {user: user, recaptcha: recaptcha};
    this.post<AuthenticationResponse>(ServerConfigConstants.BACKEND_ADDRESS + '/auth/register', params).subscribe({
      next: (response) => {
        localStorage.setItem('ROLE', AuthenticationRoleConstants.USER_ROLE);
        this.isLoggedIn = true;
        this.popupNotificationService.showResponse(response);
        this.router.navigate(['/home']);
      }, error: (error) => {
        this.popupNotificationService.showResponse(error);
      }, complete: () => {}
    })
  }

  logout(routeToLogout=true) {
    localStorage.setItem('ROLE', '');
    this.isLoggedIn = false;

    if (routeToLogout) {
      this.post(ServerConfigConstants.BACKEND_ADDRESS + '/auth/logout', {}).subscribe({
        next: (response: any) => {
          this.popupNotificationService.showResponse(response);
          this.router.navigate(['/auth/login']);
        }, error: (error: any) => {
          this.router.navigate(['/auth/login']);
          }, complete: () => {}
        })
      }
    }


  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getRole() {
    this.role = localStorage.getItem('ROLE');
    return this.role;
  }

  isAdmin() {
    return this.isAuthenticated() && this.getRole() === AuthenticationRoleConstants.ADMIN_ROLE;
  }
}

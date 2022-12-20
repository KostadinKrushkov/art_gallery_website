import { Injectable } from '@angular/core';
import { ServerConfigConstants } from 'src/app/shared/constants/constants';
import { BaseHttpService } from 'src/app/shared/data-access/base-http.service';
import { AuthenticationResponse, User } from 'src/app/shared/models/authentication.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseHttpService {
  public isLoggedIn = false;
  public isAdmin = false;

  register(user: User) {
    return this.post<AuthenticationResponse>(ServerConfigConstants.BACKEND_ADDRESS + '/auth/register', user);
  }

  login(user: User) {
    return this.post<AuthenticationResponse>(ServerConfigConstants.BACKEND_ADDRESS + '/auth/login', user);
  }

  logout() {
    return this.post(ServerConfigConstants.BACKEND_ADDRESS + '/auth/logout', {});
  }

}

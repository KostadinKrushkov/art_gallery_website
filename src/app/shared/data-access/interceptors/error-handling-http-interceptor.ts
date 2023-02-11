import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';

@Injectable()
export class ErrorHandlingHTTPInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return next.handle(request).pipe(tap(
        (event: HttpEvent<any>) => {return event; },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403 || error.status === 498) {
                // TODO decide whether or not I will need it, if every request has handling for it's error on its own remove it
                // this.popupNotificationService.showErrorMessage('The authentication session has expired or the user is not authorised. Redirecting to login page.');
                this.authenticationService.logout(false);
            }
        }
        return error;
        }))
    }
}

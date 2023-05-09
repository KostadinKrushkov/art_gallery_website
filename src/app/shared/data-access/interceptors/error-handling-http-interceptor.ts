import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingHTTPInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return next.handle(request).pipe(tap(
        (event: HttpEvent<any>) => {return event; },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403 || error.status === 498) {
                this.authenticationService.logout(false);
                this.router.navigate(['/auth/login']);
            }
        }
        return error;
        }))
    }
}

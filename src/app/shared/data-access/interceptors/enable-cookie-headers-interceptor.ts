import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { ServerConfigConstants } from '../../constants/constants';

@Injectable()
export class EnableCookieHeadersInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      // Sets headers necessary for CORS
      let headers = new HttpHeaders();
      headers = headers.set('Access-Control-Allow-Credentials', 'true');
      headers = headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With, Set-Cookie, Cookie, Bearer');
      headers = headers.set('Access-Control-Allow-Origin', ServerConfigConstants.BACKEND_ADDRESS);
      headers = headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

      request = request.clone({withCredentials: true, ...headers});
      return next.handle(request);
  }
}

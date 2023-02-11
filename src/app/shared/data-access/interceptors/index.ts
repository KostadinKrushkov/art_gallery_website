import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnableCookieHeadersInterceptor } from './enable-cookie-headers-interceptor';
import { ErrorHandlingHTTPInterceptor } from './error-handling-http-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnableCookieHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingHTTPInterceptor, multi: true },
];

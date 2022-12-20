import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnableCookieHeadersInterceptor } from './enable-cookie-headers-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnableCookieHeadersInterceptor, multi: true },
];

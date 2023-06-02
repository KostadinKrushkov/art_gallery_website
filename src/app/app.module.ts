import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './shared/data-access/interceptors';
import { SharedComponentsModule } from './shared/shared-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AuthenticationService } from './auth/data-access/authentication.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    NotifierModule.withConfig({
      position: { horizontal: { position: 'right' }, vertical: { position: 'top'}}, behaviour: { autoHide: 6000 }
    }),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthenticationService,
    httpInterceptorProviders,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

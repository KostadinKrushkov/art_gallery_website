import { NgModule } from '@angular/core';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { ContactPageRoutingModule } from './contact-routing.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    ContactPageRoutingModule,
    CoreComponentsModule,
    NgxCaptchaModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: []
})
export class ContactPageModule { }

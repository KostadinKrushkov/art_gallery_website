import { NgModule } from '@angular/core';
import { AboutPageComponent } from '../about-page/about-page.component';
import { AboutPageRoutingModule } from './about-routing.module';


@NgModule({
  declarations: [
    AboutPageComponent,
  ],
  imports: [
    AboutPageRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class AboutPageModule { }

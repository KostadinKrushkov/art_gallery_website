import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    HomePageRoutingModule,
    NgbPaginationModule,
    NgbModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class HomePageModule { }

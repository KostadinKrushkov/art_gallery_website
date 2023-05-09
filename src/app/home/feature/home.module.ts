import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";

import { HomePageRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FavouritesMultiSelectDropdownComponent } from '../ui/favourites-multi-select-dropdown/favourites-multi-select-dropdown.component';


@NgModule({
  declarations: [
    HomePageComponent,
    FavouritesMultiSelectDropdownComponent,
  ],
  imports: [
    HomePageRoutingModule,
    NgbPaginationModule,
    NgbModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: []
})
export class HomePageModule { }

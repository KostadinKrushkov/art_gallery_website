import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";

import { HomePageComponent } from './home-page/home-page.component';
import { FavouritesMultiSelectDropdownComponent } from '../ui/favourites-multi-select-dropdown/favourites-multi-select-dropdown.component';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { RouterModule, Routes } from '@angular/router';
import { UIGalleryComponentsModule } from 'src/app/gallery/ui/ui-gallery-components.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  }
];


@NgModule({
  declarations: [
    HomePageComponent,
    FavouritesMultiSelectDropdownComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgbModule,
    CommonModule,
    CoreComponentsModule,
    FormsModule,
    UIGalleryComponentsModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: []
})
export class HomePageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { PictureDetailsPopupComponent } from './picture-details-popup/picture-details-popup.component';
import { SelectableButtonsBarComponent } from './selectable-buttons-bar/selectable-buttons-bar.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';


@NgModule({
  declarations: [

    PictureDetailsPopupComponent,
    SelectableButtonsBarComponent
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
  ], exports: [
    SelectableButtonsBarComponent,
  ]
})
export class UIGalleryComponentsModule { }

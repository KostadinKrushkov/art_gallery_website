import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { PictureFormComponent } from './picture-form/picture-form.component';


@NgModule({
  declarations: [
    PictureFormComponent,
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
  ], exports: [
    PictureFormComponent
  ]
})
export class UIPictureComponentsModule { }

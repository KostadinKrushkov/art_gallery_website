import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form.component';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';


@NgModule({
  declarations: [
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
  ], exports: [
    CategoryFormComponent
  ]
})
export class UICategoryComponentsModule { }

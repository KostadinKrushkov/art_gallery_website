import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryPageComponent } from './edit-category-page.component';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';

const routes: Route[] = [
  {
    path: '', component: EditCategoryPageComponent
  }
]

@NgModule({
  declarations: [
    EditCategoryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    UICategoryComponentsModule,
  ]
})
export class EditCategoryPageModule { }

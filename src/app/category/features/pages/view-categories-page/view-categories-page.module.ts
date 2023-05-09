import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';
import { ViewCategoriesPageComponent } from './view-categories-page.component';

const routes: Route[] = [
  {
    path: '', component: ViewCategoriesPageComponent
  }
]

@NgModule({
  declarations: [
    ViewCategoriesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    UICategoryComponentsModule,
  ]
})
export class ViewCategoriesPageModule { }

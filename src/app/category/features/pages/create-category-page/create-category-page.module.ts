import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CreateCategoryPageComponent } from './create-category-page.component';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';

const routes: Route[] = [
  {
    path: '', component: CreateCategoryPageComponent
  }
]

@NgModule({
  declarations: [

    CreateCategoryPageComponent
  ],
  imports: [
    CoreComponentsModule,
    RouterModule.forChild(routes),
    UICategoryComponentsModule
  ]
})
export class CreateCategoryPageModule { }

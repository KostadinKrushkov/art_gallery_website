import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';
import { CreateBlogPageComponent } from './create-blog-page.component';
import { UIBlogComponentsModule } from 'src/app/blog/ui/ui-blog-components.module';

const routes: Route[] = [
  {
    path: '', pathMatch: 'full', component: CreateBlogPageComponent
  }
]

@NgModule({
  declarations: [
    CreateBlogPageComponent
  ],
  imports: [
    CoreComponentsModule,
    RouterModule.forChild(routes),
    UICategoryComponentsModule,
    UIBlogComponentsModule
  ]
})
export class CreateBlogPageModule { }

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';
import { UIBlogComponentsModule } from 'src/app/blog/ui/ui-blog-components.module';
import { EditBlogPageComponent } from './edit-blog-page.component';

const routes: Route[] = [
  {
    path: '', component: EditBlogPageComponent
  }
]

@NgModule({
  declarations: [
    EditBlogPageComponent
  ],
  imports: [
    CoreComponentsModule,
    RouterModule.forChild(routes),
    UICategoryComponentsModule,
    UIBlogComponentsModule
  ]
})
export class EditBlogPageModule { }

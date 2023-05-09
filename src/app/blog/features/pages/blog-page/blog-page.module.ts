import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { UICategoryComponentsModule } from 'src/app/category/ui/category-form/ui-category-components.module';
import { UIBlogComponentsModule } from 'src/app/blog/ui/ui-blog-components.module';
import { BlogPageComponent } from './blog-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Route[] = [
  {
    path: '', component: BlogPageComponent
  }
]

@NgModule({
  declarations: [
    BlogPageComponent
  ],
  imports: [
    CoreComponentsModule,
    RouterModule.forChild(routes),
    UICategoryComponentsModule,
    UIBlogComponentsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
  ]
})
export class BlogPageModule { }

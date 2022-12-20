import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () =>
      import('../pages/blog-page/blog-page.module').then(
        (m) => m.BlogPageModule
      ),
  }, {
    path: 'new',
    loadChildren: () =>
      import('../pages/create-blog-page/create-blog-page.module').then(
        (m) => m.CreateBlogPageModule
      ),
  }, {
    path: 'edit/:blog-title',
    loadChildren: () =>
      import('../pages/edit-blog-page/edit-blog-page.module').then(
        (m) => m.EditBlogPageModule
      ),
  },
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: []
})
export class BlogPageRoutingModule { }

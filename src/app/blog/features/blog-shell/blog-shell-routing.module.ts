import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/auth/data-access/authentication-guard.service';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () =>
      import('../pages/blog-page/blog-page.module').then(
        (m) => m.BlogPageModule
      ),
  },{
    path: 'new', pathMatch: 'full',
    canActivate: [AuthenticationGuardService],
    data: {
      role: ['ADMIN_ROLE']
    },
    loadChildren: () =>
      import('../pages/create-blog-page/create-blog-page.module').then(
        (m) => m.CreateBlogPageModule
      ),
  },  {
    path: ':blog-title',
    loadChildren: () =>
      import('../pages/full-blog-page/full-blog-page.module').then(
        (m) => m.FullBlogPageModule
      ),
  }, {
    path: 'edit/:blog-title',
    canActivate: [AuthenticationGuardService],
    data: {
      role: ['ADMIN_ROLE']
    },
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
  providers: [AuthenticationGuardService],
  bootstrap: []
})
export class BlogPageRoutingModule { }

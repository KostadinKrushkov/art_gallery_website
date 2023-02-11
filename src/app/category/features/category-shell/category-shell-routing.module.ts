import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/auth/data-access/authentication-guard.service';
import { AuthenticationRoleConstants } from 'src/app/shared/constants/constants';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () =>
      import('../pages/view-categories-page/view-categories-page.module').then(
        (m) => m.ViewCategoriesPageModule
      ),
  }, {
    path: 'new',
    canActivate: [AuthenticationGuardService],
    data: {
      role: [AuthenticationRoleConstants.ADMIN_ROLE]
    },
    loadChildren: () =>
    import('../pages/create-category-page/create-category-page.module').then(
      (m) => m.CreateCategoryPageModule
      ),
  }, {
    path: 'edit/:category-name',
    canActivate: [AuthenticationGuardService],
    data: {
      role: [AuthenticationRoleConstants.ADMIN_ROLE]
    },
    loadChildren: () =>
    import('../pages/edit-category-page/edit-category-page.module').then(
      (m) => m.EditCategoryPageModule
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
export class CategoryRoutingModule { }

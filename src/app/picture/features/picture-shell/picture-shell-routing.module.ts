import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from 'src/app/auth/data-access/authentication-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'picture', pathMatch: 'full'
  }, {
    path: 'new',
    canActivate: [AuthenticationGuardService],
    data: {
      role: ['ADMIN_ROLE']
    },
    loadChildren: () =>
      import('../pages/create-picture-page/create-picture-page.module').then(
        (m) => m.CreatePicturePageModule
      ),
  }, {
    path: 'edit/:picture-title',
    canActivate: [AuthenticationGuardService],
    data: {
      role: ['ADMIN_ROLE']
    },
    loadChildren: () =>
      import('../pages/edit-picture-page/edit-picture-page.module').then(
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
export class PictureRoutingModule { }

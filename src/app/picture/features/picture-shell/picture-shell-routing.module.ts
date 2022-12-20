import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'picture', pathMatch: 'full'
  }, {
    path: 'new',
    loadChildren: () =>
      import('../pages/create-picture-page/create-picture-page.module').then(
        (m) => m.CreatePicturePageModule
      ),
  }, {
    path: 'edit/:picture-title',
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
  providers: [],
  bootstrap: []
})
export class PictureRoutingModule { }

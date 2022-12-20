import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () =>
      import('../pages/view-categories-page/view-categories-page.module').then(
        (m) => m.ViewCategoriesPageModule
      ),
  }, {
    path: 'new',
    loadChildren: () =>
    import('../pages/create-category-page/create-category-page.module').then(
      (m) => m.CreateCategoryPageModule
      ),
  }, {
    path: 'edit/:category-name',
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
  providers: [],
  bootstrap: []
})
export class CategoryRoutingModule { }

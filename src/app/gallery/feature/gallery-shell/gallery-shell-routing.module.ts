import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () =>
      import('../pages/gallery-page/gallery-page.module').then(
        (m) => m.GalleryPageModule
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
export class GalleryRoutingModule { }

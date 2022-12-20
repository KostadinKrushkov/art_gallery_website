import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../about-page/about-page.component';


const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
  }
];

// const routes: Routes = [
//   {
//     path: '', pathMatch: 'full',
//     loadChildren: () =>
//       import('../about-page/about-page.module').then(
//         (m) => m.AboutPageModule
//       ),
//   },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutPageRoutingModule {}

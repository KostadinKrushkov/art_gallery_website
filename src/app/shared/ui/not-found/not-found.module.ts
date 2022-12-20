import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const notfoundRoutes: Routes = [
  { path: '',  component: NotFoundComponent }
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule.forChild(notfoundRoutes)
  ],
  providers: [],
  bootstrap: []
})
export class NotFoundPageModule { }

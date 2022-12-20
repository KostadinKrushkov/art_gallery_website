import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ContactPageComponent } from '../contact-page/contact-page.component';


const routes: Route[] = [
  {
    path: '', component: ContactPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactPageRoutingModule {}

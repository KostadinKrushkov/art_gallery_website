import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShoppingPageComponent } from '../pages/shopping-page/shopping-page.component';


const routes: Route[] = [
  {
    path: '', component: ShoppingPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopPageRoutingModule {}

import { NgModule } from '@angular/core';
import { ShoppingPageComponent } from '../pages/shopping-page/shopping-page.component';
import { ShopPageRoutingModule } from './shop-routing.module';


@NgModule({
  declarations: [
    ShoppingPageComponent
  ],
  imports: [
    ShopPageRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class ShopPageModule { }

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GalleryPageComponent } from './gallery-page.component';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UIGalleryComponentsModule } from 'src/app/gallery/ui/ui-gallery-components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Route[] = [
  {
    path: '', component: GalleryPageComponent
  }
]

@NgModule({
  declarations: [
    GalleryPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CoreComponentsModule,
    SharedComponentsModule,
    NgbModule,
    UIGalleryComponentsModule,
    InfiniteScrollModule
  ]
})
export class GalleryPageModule { }

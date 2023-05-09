import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPicturePageComponent } from './edit-picture-page.component';
import { UIPictureComponentsModule } from 'src/app/picture/ui/ui-picture-components.module';

const routes: Route[] = [
  {
    path: '', component: EditPicturePageComponent
  }
]

@NgModule({
  declarations: [
    EditPicturePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    UIPictureComponentsModule
  ]
})
export class EditCategoryPageModule { }

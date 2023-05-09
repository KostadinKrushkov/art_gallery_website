import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePicturePageComponent } from './create-picture-page.component';
import { UIPictureComponentsModule } from 'src/app/picture/ui/ui-picture-components.module';

const routes: Route[] = [
  {
    path: '', component: CreatePicturePageComponent
  }
]

@NgModule({
  declarations: [
    CreatePicturePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    UIPictureComponentsModule
  ]
})
export class CreatePicturePageModule { }

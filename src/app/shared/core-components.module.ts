import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const material = [
  MatSidenavModule,
  MatIconModule,
  MatButtonToggleModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    material,
  ], exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    material,
  ]
})
export class CoreComponentsModule { }

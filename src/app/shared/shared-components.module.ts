import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';

import { CoreComponentsModule } from './core-components.module';
import { ParseTimestamp } from 'src/app/shared/utils/pipes';
import { BaseFormComponent } from './ui/base-form/base-form.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const material = [
  MatSidenavModule,
  MatIconModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
]

@NgModule({
  declarations: [
    BaseFormComponent,
    ParseTimestamp,
  ],
  imports: [
    material,
    CommonModule,
    CoreComponentsModule,
    NgbModule,
    NgxHideOnScrollModule,
  ], exports: [
    BaseFormComponent,
    ParseTimestamp,
    CoreComponentsModule,
    material,
    NgxHideOnScrollModule,
  ]
})
export class SharedComponentsModule { }

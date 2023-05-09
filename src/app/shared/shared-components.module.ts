import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './ui/header/header.component';
import { CoreComponentsModule } from './core-components.module';
import { ParseTimestamp } from 'src/app/shared/utils/pipes';
import { BaseFormComponent } from './ui/base-form/base-form.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BaseFormComponent,
    ParseTimestamp,
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
    NgbModule,
  ], exports: [
    HeaderComponent,
    BaseFormComponent,
    ParseTimestamp,
  ]
})
export class SharedComponentsModule { }

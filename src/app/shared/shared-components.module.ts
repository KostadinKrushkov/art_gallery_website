import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { CoreComponentsModule } from './core-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParseTimestamp } from 'src/app/shared/utils/pipes';


@NgModule({
  declarations: [
    HeaderComponent,
    ParseTimestamp,
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
    NgbModule,
  ], exports: [
    HeaderComponent,
    ParseTimestamp,
  ]
})
export class SharedComponentsModule { }

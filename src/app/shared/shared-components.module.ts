import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { CoreComponentsModule } from './core-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreComponentsModule,
    NgbModule,
  ], exports: [
    HeaderComponent,
  ]
})
export class SharedComponentsModule { }

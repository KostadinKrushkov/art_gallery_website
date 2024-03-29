import { NgModule } from '@angular/core';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogRowCardComponent } from './blog-row-card/blog-row-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

@NgModule({
  declarations: [
    BlogFormComponent,
    BlogRowCardComponent
  ],
  imports: [
    CoreComponentsModule,
    EditorModule,
    NgbModule,
    SharedComponentsModule,
  ], exports: [
    BlogFormComponent,
    BlogRowCardComponent,
  ], providers: [
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ]
})
export class UIBlogComponentsModule { }

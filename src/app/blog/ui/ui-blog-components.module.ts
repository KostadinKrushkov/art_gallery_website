import { NgModule } from '@angular/core';
import { CoreComponentsModule } from 'src/app/shared/core-components.module';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BlogRowCardComponent } from './blog-row-card/blog-row-card.component'; // TODO figure out if you can add the provider and BrowserModule here instead of in app.module.ts


@NgModule({
  declarations: [
    BlogFormComponent,
    BlogRowCardComponent
  ],
  imports: [
    CoreComponentsModule,
    EditorModule,
  ], exports: [
    BlogFormComponent,
    BlogRowCardComponent,
  ], providers: [
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ]
})
export class UIBlogComponentsModule { }

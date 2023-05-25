import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { AsyncSubject, Subject } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';
import { FormActionsConstants } from 'src/app/shared/constants/constants';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { BaseFormComponent } from 'src/app/shared/ui/base-form/base-form.component';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent extends BaseFormComponent {
  private editorSubject: Subject<any> = new AsyncSubject();
  public imageErrorMessage = '';
  public imageFound = false;
  public imgSource: string | null | ArrayBuffer = null;
  override formType = 'blog';

  @ViewChild('editor') editor: any;

  content: string = '';
  title: string = '';
  htmlPresenterString: string = '';
  successfully_saved_blog: Blog | null = null;

  public override myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private popupNotificationService: PopupNotificationsService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.params.subscribe(routeParams => {
      if (routeParams['blog-title']) {
        this.setBlogFormData(routeParams['blog-title']);
      }
    });
  }

  setBlogFormData(blogTitle: string) {
    this.dataStorageService.getBlog(blogTitle).subscribe(
      response => {
      if (response.json) {
        const blog = response.json;
        this.myForm.setValue({
          title: blog.title,
          content: blog.content,
        });

        this.imgSource = `${blog.image_format},${blog.image}`;
        this.imageFound = true;
      } else {
        this.popupNotificationService.showErrorMessage("Could not find a blog with title " + blogTitle);
      }
    });
  }

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  override onSubmit() {
    if (this.successfully_saved_blog) {
      this.mode = FormActionsConstants.UPDATE;
    }

    if (this.myForm.controls['content'].value) {
      this.content = this.myForm.controls['content'].value;
    }

    if (this.myForm.controls['title'].value) {
      this.title = this.myForm.controls['title'].value;
    }

    const blog = {
      'content': this.content,
      'title': this.title,
      'image': this.imgSource
    } as Blog;

    if (this.content.length === 0 || this.title.length == 0) {
      this.popupNotificationService.showWarningMessage("You need to fill both title and content boxes.");
      return;
    }

    this.dataStorageService.getBlogs().subscribe(response => {
      let foundBlog = false;
      for (let i = 0; i < response.json.length; i++) {{
        if (response.json[i].title == this.title) {
          foundBlog = true;
        }
      }}

      if (this.mode === FormActionsConstants.CREATE) {
          this.dataStorageService.saveBlog(blog).subscribe(response => {
            this.successfully_saved_blog = blog;
            this.mode = FormActionsConstants.UPDATE;
            this.refreshButtonMessage();
            this.popupNotificationService.showResponse(response);
          }, (error) => {
            this.popupNotificationService.showResponse(error);
          })
      } else {
        this.dataStorageService.updateBlog(blog).subscribe(response => {
          this.popupNotificationService.showResponse(response);
        }, (error) => {
          this.popupNotificationService.showResponse(error);
        })
      }
    })

    this.htmlPresenterString = this.content.slice();
    this.dataStorageService
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.imageErrorMessage = "Only images are supported.";
        this.popupNotificationService.showWarningMessage(this.imageErrorMessage);
        return;
    }

    if (files[0].name) {
      this.imageFound = true;
    }
    this.setImageUrl(files[0])
  }

  setImageUrl(imageBlob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onload = (_event) => {
      this.imgSource = reader.result;
    }
  }

  removeUploadedImage() {
    let inputFile = <HTMLInputElement>document.getElementById('uploadedFile');
    inputFile.value = '';

    this.imgSource = null;
    this.imageFound = false;
  }
}

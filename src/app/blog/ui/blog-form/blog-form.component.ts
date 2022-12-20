import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { AsyncSubject, Subject } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Blog } from 'src/app/shared/models/entity.models';
import { FormActionsConstants } from 'src/app/shared/constants/constants';
import { ActivatedRoute } from '@angular/router';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  private editorSubject: Subject<any> = new AsyncSubject();
  public imageErrorMessage = '';
  public imageFound = false;
  public imgSource: string | null | ArrayBuffer = '';
  public submitted = false;
  public buttonMessage = '';

  @Input()
  public mode = FormActionsConstants.CREATE;

  @ViewChild('editor') editor: any;

  content: any = '';
  title: any = '';
  htmlPresenterString: any;

  public myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private popupNotificationService: PopupNotificationsService) {}

  ngOnInit(): void {
    if (this.mode === FormActionsConstants.CREATE) {
      this.buttonMessage = "Save blog";
    } else if (this.mode === FormActionsConstants.UPDATE) {
      this.buttonMessage = "Update blog";
    }

    this.route.params.subscribe(routeParams => {
      if (routeParams['blog-title']) {
        this.setBlogFormData(routeParams['blog-title']);
      }
    });
  }

  setBlogFormData(blogTitle: string) {
    this.dataStorageService.getBlog(blogTitle).subscribe(response => { // TODO fix
      if (response.json) {
        const blog = response.json
        this.myForm.setValue({
          title: blog.title,
          content: blog.content,
        });

        this.imgSource = blog.image;
        this.imageFound = true;
      } else {
        this.popupNotificationService.showErrorMessage("Could not find a blog with title " + blogTitle);
      }
    });
  }

  get registerFormControl() {
    return this.myForm.controls;
  }

  onSubmit() {

  }

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  onSaveContent() {
    this.content = this.myForm.controls['content'].value;
    this.title = this.myForm.controls['title'].value;

    const blog = {
      'content': this.content,
      'title': this.title,
      'image': this.imgSource
    } as Blog

    this.dataStorageService.getBlogs().subscribe(response => {
      let foundBlog = false;
      for (let i = 0; i < response.json.length; i++) {{
        if (response.json[i].title == this.title) {
          foundBlog = true;
        }
      }}

      if (!foundBlog) {
          this.dataStorageService.saveBlog(blog).subscribe(response => {
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

// TODO check if you can extract the form classes into a generic form base class with onsubmit ...

import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormActionsConstants } from 'src/app/shared/constants/constants';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css']
})
export class PictureFormComponent implements OnInit {
  public myForm: FormGroup;
  public selectedFile: File;
  public imageErrorMessage = "";
  public imagePath = "";
  public imgUrl: any;
  public receivedImage: any;
  public buttonMessage = "";

  @Input()
  public mode: string = FormActionsConstants.CREATE
  public categoriesNames: string[] = [];

  submitted = false;
  is_loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private _sanitizer: DomSanitizer,
    private dataStorageService: DataStorageService, private popupNotificationService: PopupNotificationsService) {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('',  Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.selectedFile = <File>{"name": ""};
  }

  ngOnInit(): void {
    this.setCategoryNames();
    if (this.mode === FormActionsConstants.CREATE) {
      this.buttonMessage = "Create picture";
    } else if (this.mode === FormActionsConstants.UPDATE) {
      this.buttonMessage = "Update picutre";
    }

    this.route.params.subscribe(routeParams => {
      if (routeParams['picture-title']) {
        this.setPictureFormData(routeParams['picture-title']);
      }
    });

    this.disableControls()
  }

  disableControls() {
    let inputFormControl = this.myForm?.get('title')
    if (inputFormControl && this.mode === FormActionsConstants.UPDATE) {
      inputFormControl.disable();
    }
  }

  setCategoryNames() {
    this.categoriesNames = []
    let categoryNames: string[] = [];
    this.dataStorageService.getCategories().subscribe(response => {
      response.json.forEach(function (this: any, category) {
        categoryNames.push(category.name);
      });
    });

    this.categoriesNames = categoryNames;
  }

  setPictureFormData(pictureTitle: string) {
    this.dataStorageService.getPicture(pictureTitle).subscribe(response => {
      if (response.json) {
        const picture = response.json

        this.myForm.setValue({
          title: picture.title,
          description: picture.description,
          category: picture.category,
        });

        this.imgUrl = picture.image;
      } else {
        this.popupNotificationService.showErrorMessage("Could not find a picutre with title " + pictureTitle)
      }
    }, (error) => {
      this.popupNotificationService.showErrorMessage(error);
    });
  }

  get registerFormControl() {
    return this.myForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;

    if (form.valid) {
        this.is_loading = true;

        let picture = {
          image: this.imgUrl,
          title: form.controls['title'].value,
          description: form.controls['description'].value,
          category: form.controls['category'].value,
        } as Picture

        let request_observable;
        if (this.mode === FormActionsConstants.CREATE) {
          request_observable = this.dataStorageService.savePicture(picture);
        } else {
          request_observable = this.dataStorageService.updatePicture(picture);
        }

        request_observable.subscribe(response => {
        this.popupNotificationService.showResponse(response);
        this.router.navigate(['/gallery']);

      }, (error) => {
        this.popupNotificationService.showResponse(error);
        this.is_loading = false;
      });
    }

  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.imageErrorMessage = "Only images are supported.";
        this.popupNotificationService.showWarningMessage(this.imageErrorMessage)
        return;
    }

    const reader = new FileReader();
    this.imagePath = files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.imgUrl = reader.result;
    }
  }
}

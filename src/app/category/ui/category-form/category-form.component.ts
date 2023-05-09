import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormActionsConstants } from 'src/app/shared/constants/constants';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Category } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { BaseFormComponent } from 'src/app/shared/ui/base-form/base-form.component';
import { BasicResponse } from '../../../shared/models/authentication.models';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseFormComponent {
  override formType = 'category';

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router, private popupNotificationService: PopupNotificationsService) {
    super();

    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      weight: new FormControl(''),
      enabled: new FormControl('enabled'),
      is_subcategory: new FormControl('category')
    });
  }

  parseWeight(weight: any) {
    const weightValue = weight.value;
    if (weightValue && !Number.isNaN(Number(weightValue))) {
      return parseFloat(weightValue);
    } else {
      this.popupNotificationService.showWarningMessage("The weight needs to be a number");
    }
    return null;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.params.subscribe(routeParams => {
      if (routeParams['category-name']) {
        this.setCategoryFormData(routeParams['category-name']);
      }
    });

    this.disableControls();
  }

  disableControls() {
    let inputFormControl = this.myForm?.get('name')
    if (inputFormControl && this.mode === FormActionsConstants.UPDATE) {
      inputFormControl.disable();
    }
  }

  setCategoryFormData(categoryName: string) {
    this.dataStorageService.getCategory(categoryName).subscribe(response => {
      if (response.json) {
        const category = response.json

        this.myForm.setValue({
          name: category.name,
          weight: category.weight || 0,
          enabled: category.enabled ? 'enabled' : 'disabled',
          is_subcategory: category.is_subcategory ? 'subcategory' : 'category'
        });
      } else {
        this.popupNotificationService.showErrorMessage("Could not find a category with name " + categoryName);
      }
    });
  }

  override onSubmit(form: FormGroup) {
    this.submitted = true;

    if (form.valid) {
      this.is_loading = true;
      let category = {
        name: form.controls['name'].value,
        weight: this.parseWeight(form.controls['weight']),
        enabled: form.controls['enabled'].value === "enabled" ? true : false,
        is_subcategory: form.controls['is_subcategory'].value === "subcategory" ? true : false,
      } as Category;

      let responseSubscription;
      if (this.mode === FormActionsConstants.CREATE) {
        responseSubscription = this.dataStorageService.saveCategory(category);
      } else if (this.mode === FormActionsConstants.UPDATE) {
        responseSubscription = this.dataStorageService.updateCategory(category);
      } else {
        this.popupNotificationService.showErrorMessage("Unkown mode set for category-form");
        return;
      }

      responseSubscription.subscribe((response:BasicResponse<Category>) => {
        this.popupNotificationService.showResponse<Category>(response);
        this.router.navigate(['/gallery']);
      }, (error: BasicResponse<Category>) => {
        this.popupNotificationService.showResponse(error);
        this.is_loading = false;
      })

    } else {
        this.popupNotificationService.showErrorMessage("Form could not be submitted!")
      }
  }
}

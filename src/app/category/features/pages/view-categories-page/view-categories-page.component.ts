import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Category } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  selector: 'app-view-categories-page',
  templateUrl: './view-categories-page.component.html',
  styleUrls: ['./view-categories-page.component.scss']
})
export class ViewCategoriesPageComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private dataStorageService: DataStorageService, private router: Router, private notificationService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.refreshCategories();
  }

  refreshCategories() {
    this.dataStorageService.getCategories().subscribe(response => {
      this.categories = response.json;
    })
  }

  editCategory(categoryName: string) {
    this.router.navigate(['/category/edit/' + categoryName]);
  }

  deleteCategory(categoryName: string) {
    if (confirm("Are you sure you want to delete category: " + categoryName)) {
      this.dataStorageService.deleteCategory(categoryName).subscribe(response => {
        this.notificationService.showSuccessfulMessage(response.message);
        this.refreshCategories();
      })
    }
  }

}

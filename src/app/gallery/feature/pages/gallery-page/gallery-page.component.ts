import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { PictureDetailsPopupComponent } from 'src/app/gallery/ui/picture-details-popup/picture-details-popup.component';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerConfigConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {
  private cursorPictureTitle: string = '';
  public loadedPictures: Picture[] = [];
  public allFilteredPictures: Picture[] = [];

  public categoryNameList: string[] = ['All'];
  public pictureYearsList: string[] = ['All'];

  public selectedCategoryNames: string[] = [];
  public selectedYears: string[] = [];
  public selector: string = ".main-panel";
  public is_loading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private dataStorageService: DataStorageService, public dialog: MatDialog, private router: Router,
    private popupNotificationService: PopupNotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.refreshPictureData();
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  setSelectedCategoryNamesAndRefreshData(buttonNames: string[]) {
    this.selectedCategoryNames = buttonNames;
    this.refreshPictureData();
  }

  setSelectedYearsAndRefreshData(buttonNames: string[]) {
    this.selectedYears = buttonNames;
    this.refreshPictureData();
  }

  showPictureDetails(picture: Picture) {
    let dialogRef = this.dialog.open(PictureDetailsPopupComponent, {
      height: '95%',
      width: '95%',
      data: picture
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  onScroll() {
    this.loadMoreItems();
  }

  loadMoreItems(): void {
    this.spinner.show();

    this.is_loading = true;
    this.dataStorageService.getPictures(this.selectedCategoryNames, this.selectedYears, ServerConfigConstants.NUM_PICTURES_TO_EXTEND_LOAD, this.cursorPictureTitle).subscribe((response) => {
      let picturesToLoad = response.json;
      if (picturesToLoad.length !== 0) {
        this.loadedPictures = [...this.loadedPictures, ...picturesToLoad]
        this.cursorPictureTitle = picturesToLoad[picturesToLoad.length - 1].title;
      }

    }, (error) => {
      this.popupNotificationService.showErrorMessage(error);
    }, () => {
      this.is_loading = false;
      this.spinner.hide();
    });
  }

  refreshPictureData() {
    this.loadedPictures = [];
    this.is_loading = true;

    let pictureYearsSubscription = this.dataStorageService.getDistinctPictureYears();
    let picturesSubscription = this.dataStorageService.getPictures(this.selectedCategoryNames, this.selectedYears);
    let categoriesSubscription = this.dataStorageService.getCategories(true);

    forkJoin([pictureYearsSubscription, picturesSubscription, categoriesSubscription]).subscribe((responses) => {
      if (this.pictureYearsList.length === 1) {
        this.pictureYearsList = [...this.pictureYearsList, ...responses[0].json];
      }

      this.loadedPictures = [...responses[1].json];
      if (this.loadedPictures.length !== 0) {
        this.cursorPictureTitle = responses[1].json[responses[1].json.length - 1].title;
      }

      let categories = responses[2].json;
      if (this.categoryNameList.length === 1) {
        for (let category of categories) {
          this.categoryNameList.push(category.name)
        }
      }

      this.spinner.hide();
    }, (error) => {
      this.popupNotificationService.showResponse(error);
      this.spinner.hide();
    }, () => {
      this.is_loading = false;
    })
  }

  getFilteredYears() {
    return this.filterDataList(this.pictureYearsList, this.selectedYears);
  }

  getFilteredCategories() {
    return this.filterDataList(this.categoryNameList, this.selectedCategoryNames);
  }

  filterDataList(dataList: string[], selectables: string[]) {
    if (selectables.includes('All')) {
      return dataList.slice(1);
    } else {
      return dataList.filter((value) => {
        return selectables.includes(value);
      })
    }
  }

  editPicture(picture: Picture) {
    this.router.navigate(['/picture/edit/' + picture.title]);
  }

  deletePicture(picture: Picture) {
    if (confirm("Are you sure you want to delete: " + picture.title)) {
      this.dataStorageService.deletePicture(picture.title).subscribe((response) => {
        this.refreshPictureData();
        this.popupNotificationService.showResponse(response);
      }, (error) => {
        this.popupNotificationService.showResponse(error);
      });
    }
  }

  open(event: Event) {
    event.stopPropagation(); // To stop the parent on click effect
  }
}

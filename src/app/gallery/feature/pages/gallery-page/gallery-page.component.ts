import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { PictureDetailsPopupComponent } from 'src/app/gallery/ui/picture-details-popup/picture-details-popup.component';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { DateUtilities } from 'src/app/shared/utils/utility-functions';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  public loadedPictures: Picture[] = [];
  public allFilteredPictures: Picture[] = [];
  private categoryNamesSet: Set<string> = new Set(['All']);
  private pictureYearsSet: Set<string> = new Set(['All']);
  public categoryNameList: string[] = [];
  public pictureYearsList: string[] = [];

  public selectedCategoryNames: string[] = [];
  public selectedYears: string[] = [];
  public selector: string = ".main-panel";


  constructor(private authenticationService: AuthenticationService, private dataStorageService: DataStorageService, public dialog: MatDialog, private router: Router,
    private popupNotificationService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.refreshPictureData();
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  setSelectedCategoryNamesAndRefreshData(buttonNames: string[]) {
    this.loadedPictures = [];

    this.selectedCategoryNames = buttonNames;
    this.refreshPictureData();
  }

  setSelectedYearsAndRefreshData(buttonNames: string[]) {
    this.loadedPictures = [];

    this.selectedYears = buttonNames;
    this.refreshPictureData();
  }

  showPictureDetails(picture: Picture) {
    let dialogRef = this.dialog.open(PictureDetailsPopupComponent, {
      height: '95%',
      width: '95%',
      data: picture
    });``


    dialogRef.afterClosed().subscribe(() => {});
  }

  onScroll() {
    this.loadMoreItems();
  }

  loadMoreItems(): boolean {
    if (this.loadedPictures.length >= this.allFilteredPictures.length) {
      return false;
    }
    const remainingLength = Math.min(3, this.allFilteredPictures.length - this.loadedPictures.length);
    let morePictures = this.allFilteredPictures.slice(this.loadedPictures.length, this.loadedPictures.length + remainingLength);
    this.loadedPictures.push(...morePictures);
    return true;
  }

  refreshPictureData() {
    let picturesSubscription = this.dataStorageService.getPictures();
    let categoriesSubscription = this.dataStorageService.getCategories();

    forkJoin([picturesSubscription, categoriesSubscription]).subscribe((responses) => {
      this.allFilteredPictures = responses[0].json;
      let categories = responses[1].json;

      if (this.pictureYearsList.length === 0 && this.categoryNameList.length === 0) {
        for (let picture of this.allFilteredPictures) {
          this.pictureYearsSet.add(DateUtilities.getYearFromDate(picture.created_at));
        }

        for (let category of categories) {
          this.categoryNamesSet.add(category.name);
        }

        this.pictureYearsList = Array.from(this.pictureYearsSet);
        this.categoryNameList = Array.from(this.categoryNamesSet);
      }

      this.sortPictureYears()
      this.sortPictures();
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

  sortPictureYears() {
    this.pictureYearsList = this.pictureYearsList.sort((objA, objB) => Number(objA) - Number(objB));
  }

  sortPictures() {
    let filteredYears: string[] = this.getFilteredYears();
    let filteredCategories: string[] = this.getFilteredCategories();

    let yearsToPicturesListMap: any = {};
    for (let picture of this.allFilteredPictures.slice()) {
      const yearOfCreation = DateUtilities.getYearFromDate(picture.created_at);

      let yearList = yearsToPicturesListMap[yearOfCreation]

      if (filteredYears.includes(yearOfCreation)) {
        if (!(yearList instanceof Array)) {
          yearList = [];
          yearsToPicturesListMap[yearOfCreation] = yearList;
        }

        if (filteredCategories.includes(picture.category)) {
          yearList.push(picture);
        }
      }
    }

    this.allFilteredPictures = [];
    let key: keyof typeof yearsToPicturesListMap;
    for (key in yearsToPicturesListMap) {
      const v = yearsToPicturesListMap[key];
      this.allFilteredPictures = [...this.allFilteredPictures, ...v];  // todo add sorting for the categories ?
    }

    if (this.loadedPictures.length === 0) {
      this.loadedPictures = this.allFilteredPictures.slice(0, 9);
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

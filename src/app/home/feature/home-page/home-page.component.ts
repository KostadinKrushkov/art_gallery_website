import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { BasicResponse } from 'src/app/shared/models/authentication.models';
import { Picture } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public options: Picture[] = [];
  public selectedOptions: Picture[] = [];

  constructor(private dataStorageService: DataStorageService, private popupNotificationService: PopupNotificationsService, private authenticationService: AuthenticationService, private loadingSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.reloadData();
   }

  reloadData() {
    this.loadingSpinner.show();

    this.dataStorageService.getPicturesForHome()
    .pipe(
      concatMap((homePicturesResponse: BasicResponse<Picture[]>) => {
        this.selectedOptions = [];

        for (let picture of homePicturesResponse.json) {
          this.selectedOptions.push(picture);
        }

        return this.dataStorageService.getPictures();
      })
    )
    .subscribe((allPicturesResponse) => {
      this.options = [];

      for (let picture of allPicturesResponse.json) {
        this.options.push(picture);
      }
      this.loadingSpinner.hide();
    }, (error) => {
      this.popupNotificationService.showResponse(error);
      this.loadingSpinner.hide();
    });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  updateFavourites(selectedPictures: Picture[]) {
    this.loadingSpinner.show();
    this.dataStorageService.updateFavouritePictures(selectedPictures).subscribe((response) => {
      this.popupNotificationService.showResponse(response);
      this.reloadData();
    }, (error) => {
      this.popupNotificationService.showResponse(error);
      this.loadingSpinner.hide();
    });
  }
}

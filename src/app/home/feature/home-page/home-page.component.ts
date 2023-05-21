import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
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
    console.log('Starting reload');
    this.loadingSpinner.show();

    // Loading the favourite pictures to be shown
    this.dataStorageService.getPicturesForHome().subscribe(response => {
      console.log('Started setting pictures')
      this.selectedOptions = [];

        for (let picture of response.json) {
          this.selectedOptions.push(picture);
        }
        console.log('Finished setting pictures')
    }, (error) => {
      this.popupNotificationService.showResponse(error);
    }, () => {
      this.loadingSpinner.hide();
      console.log('Ending reload');
    })

    // When admin mode, show all of the pictures titles to choose favourites.
    if (this.isAdmin()) {
      this.dataStorageService.getPictures().subscribe(response => {
        this.options = [];

        for (let picture of response.json) {
          this.options.push(picture);
        }
      }, (error) => {
        this.popupNotificationService.showResponse(error);
      }, () => {
      })
    }
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

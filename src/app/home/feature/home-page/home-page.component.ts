import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { PictureDetailsPopupComponent } from 'src/app/gallery/ui/picture-details-popup/picture-details-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectionService } from 'src/app/shared/services/device-detection.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public options: Picture[] = [];
  public selectedOptions: Picture[] = [];
  public actionOptionId: string = '0';

  constructor(private dataStorageService: DataStorageService, private popupNotificationService: PopupNotificationsService, private authenticationService: AuthenticationService,
    private loadingSpinner: NgxSpinnerService, public dialog: MatDialog, private deviceDetectionService: DeviceDetectionService) { }

  ngOnInit(): void {
    this.reloadData();
   }

  showPictureDetails(picture: Picture) {
    let dialogRef = this.dialog.open(PictureDetailsPopupComponent, {
      height: '97%',
      width: '97%',
      data: picture
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.actionOptionId = slideEvent.current;
  }

  reloadData() {
    this.loadingSpinner.show();

    // Loading the favourite pictures to be shown
    const isMobile = this.deviceDetectionService.isMobile();
    this.dataStorageService.getPicturesForHome(true).subscribe(response => {
      this.selectedOptions = [];

        for (let picture of response.json) {
          this.selectedOptions.push(picture);
        }
    }, (error) => {
      this.popupNotificationService.showResponse(error);
      this.loadingSpinner.hide();
    }, () => {
      this.loadingSpinner.hide();
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

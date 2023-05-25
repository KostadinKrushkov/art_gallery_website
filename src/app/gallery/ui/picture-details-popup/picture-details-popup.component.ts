import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-picture-details-popup',
  templateUrl: './picture-details-popup.component.html',
  styleUrls: ['./picture-details-popup.component.css']
})
export class PictureDetailsPopupComponent implements OnInit {
  public showDetailsFlag: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    public dialogRef: MatDialogRef<PictureDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Picture,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.dataStorageService.getPicture(this.data.title).subscribe((response) => {
      this.data = response.json;
    });
  }

  showDetails() {
    this.showDetailsFlag = true;
  }

  hideDetails() {
    this.showDetailsFlag = false;
  }
}

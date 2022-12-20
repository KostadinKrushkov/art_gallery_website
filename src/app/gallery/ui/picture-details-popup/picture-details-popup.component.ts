import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Picture } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-picture-details-popup',
  templateUrl: './picture-details-popup.component.html',
  styleUrls: ['./picture-details-popup.component.css']
})
export class PictureDetailsPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PictureDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Picture,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}

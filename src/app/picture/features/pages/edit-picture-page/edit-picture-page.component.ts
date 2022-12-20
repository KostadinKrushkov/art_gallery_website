import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-edit-picture-page',
  templateUrl: './edit-picture-page.component.html',
  styleUrls: ['./edit-picture-page.component.css']
})
export class EditPicturePageComponent implements OnInit {
  public mode=FormActionsConstants.UPDATE
  pictureTitle = '';
  pictureTitleSubscription: null | Subscription = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pictureTitleSubscription = this.route.params.subscribe(params => {
      this.pictureTitle = params['picture-title'];
   });
  }

  ngOnDestroy() {
    if (this.pictureTitleSubscription !== null) {
      this.pictureTitleSubscription.unsubscribe();
    }
  }
}

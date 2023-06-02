import { Component, OnInit } from '@angular/core';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-create-picture-page',
  templateUrl: './create-picture-page.component.html',
  styleUrls: ['./create-picture-page.component.scss']
})
export class CreatePicturePageComponent implements OnInit {
  public mode=FormActionsConstants.CREATE

  constructor() { }

  ngOnInit(): void {
  }

}

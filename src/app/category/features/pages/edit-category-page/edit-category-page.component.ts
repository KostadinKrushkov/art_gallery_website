import { Component, OnInit } from '@angular/core';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css']
})
export class EditCategoryPageComponent implements OnInit {
  public mode = FormActionsConstants.UPDATE

  constructor() { }

  ngOnInit(): void {}
}

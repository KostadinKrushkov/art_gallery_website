import { Component, OnInit } from '@angular/core';
import { FormActionsConstants } from 'src/app/shared/constants/constants';


@Component({
  selector: 'app-create-category-page',
  templateUrl: './create-category-page.component.html',
  styleUrls: ['./create-category-page.component.css']
})
export class CreateCategoryPageComponent implements OnInit {
  public mode = FormActionsConstants.CREATE;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-create-blog-page',
  templateUrl: './create-blog-page.component.html',
  styleUrls: ['./create-blog-page.component.css']
})
export class CreateBlogPageComponent implements OnInit {
  public mode = FormActionsConstants.CREATE;

  constructor() { }

  ngOnInit(): void {
  }

}

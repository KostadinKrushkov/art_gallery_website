import { Component, OnInit, Input } from '@angular/core';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-edit-blog-page',
  templateUrl: './edit-blog-page.component.html',
  styleUrls: ['./edit-blog-page.component.css']
})
export class EditBlogPageComponent implements OnInit {

  @Input()
  public mode = FormActionsConstants.UPDATE;

  constructor() { }

  ngOnInit(): void {
  }

}

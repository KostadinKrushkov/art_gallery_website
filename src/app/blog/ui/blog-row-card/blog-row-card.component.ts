import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-blog-row-card',
  templateUrl: './blog-row-card.component.html',
  styleUrls: ['./blog-row-card.component.css']
})
export class BlogRowCardComponent implements OnInit {

  @Input()
  public blog: Blog | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  // onImgError() {
  //   let image = document.getElementById('blogRowImage');
  //   if (image) {
  //     image.style.display = 'none';
  //   }
  // }

}

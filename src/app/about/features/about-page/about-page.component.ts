import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  public aboutImagePath = '/src/assets/images/rumen_self_portrait.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}

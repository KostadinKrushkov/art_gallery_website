import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Picture } from 'src/app/shared/models/entity.models';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public images: Picture[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.getPicturesForHome().subscribe(result => {
      for (let picture of result.json) {
        this.images.push(picture);
      }
    })
   }
}

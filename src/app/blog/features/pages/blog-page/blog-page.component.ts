import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  public savedBlogs: Blog[] = [];

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.retrieveBlogs();
  }

  retrieveBlogs() {
    this.dataStorageService.getBlogs().subscribe(response => {
      this.savedBlogs = response.json;
    })
  }
}

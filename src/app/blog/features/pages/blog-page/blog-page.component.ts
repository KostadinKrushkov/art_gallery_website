import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  public savedBlogs: Blog[] = [];
  public loadedBlogs: Blog[] = [];

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.retrieveBlogs();
  }

  retrieveBlogs() {
    this.dataStorageService.getBlogs().subscribe(response => {
      this.savedBlogs = response.json;
        this.loadedBlogs = this.savedBlogs.slice(0, 5);
    })
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  onScroll() {
    this.loadMoreItems();
  }

  loadMoreItems(): boolean {
    if (this.loadedBlogs.length >= this.savedBlogs.length) {
      return false;
    }
    const remainingLength = Math.min(3, this.savedBlogs.length - this.loadedBlogs.length);
    let morePictures = this.savedBlogs.slice(this.loadedBlogs.length, this.loadedBlogs.length + remainingLength);
    this.loadedBlogs.push(...morePictures);
    return true;
  }
}

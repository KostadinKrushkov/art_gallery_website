import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { ServerConfigConstants } from 'src/app/shared/constants/constants';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  public cursorBlogTitle: string = ''
  public is_loading: boolean = false;
  public savedBlogs: Blog[] = [];
  public loadedBlogs: Blog[] = [];

  constructor(private dataStorageService: DataStorageService, public sanitizer: DomSanitizer, private authenticationService: AuthenticationService, private spinner: NgxSpinnerService, public popupNotificationService: PopupNotificationsService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.retrieveBlogs();
  }

  retrieveBlogs() {
    this.is_loading = true;
    this.dataStorageService.getBlogs(ServerConfigConstants.NUM_PICTURES_TO_EXTEND_LOAD, this.cursorBlogTitle).subscribe((response) => {
      let blogsToLoad = response.json;
      if (blogsToLoad.length !== 0) {
        this.loadedBlogs = [...this.loadedBlogs, ...blogsToLoad];
        this.cursorBlogTitle = blogsToLoad[blogsToLoad.length - 1].title;
    }

      this.spinner.hide();
      this.is_loading = false
    }, (_) => {
      this.spinner.hide();
      this.is_loading = false
    });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  onScroll() {
    this.spinner.show();
    this.is_loading = true;

    this.dataStorageService.getBlogs(ServerConfigConstants.NUM_PICTURES_TO_EXTEND_LOAD, this.cursorBlogTitle).subscribe((response) => {
      let blogsToLoad = response.json;
      if (blogsToLoad.length !== 0) {
        this.loadedBlogs = [...this.loadedBlogs, ...blogsToLoad]
        this.cursorBlogTitle = blogsToLoad[blogsToLoad.length - 1].title;
      }
    }, (error) => {
      this.popupNotificationService.showErrorMessage(error);
    }, () => {
      this.is_loading = false;
      this.spinner.hide();
    });
  }
}

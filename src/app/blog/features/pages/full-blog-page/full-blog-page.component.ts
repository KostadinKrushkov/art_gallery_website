import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  selector: 'app-full-blog-page',
  templateUrl: './full-blog-page.component.html',
  styleUrls: ['./full-blog-page.component.css']
})
export class FullBlogPageComponent implements OnInit {
  public blog: Blog | null = null;
  public imgSource: string | null | ArrayBuffer = null;
  public imageFound = false;

  constructor(public sanitizer: DomSanitizer, private dataStorageService: DataStorageService, private route: ActivatedRoute, private popupNotificationService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      if (routeParams['blog-title']) {
        this.setBlogFormData(routeParams['blog-title']);
      }
    });
  }

  setBlogFormData(blogTitle: string) {
    this.dataStorageService.getBlog(blogTitle).subscribe(response => {
      if (response.json) {
        this.blog = response.json;
        this.imgSource = `${this.blog.image_format},${this.blog.image}`;
        this.imageFound = true;
      } else {
        this.popupNotificationService.showErrorMessage("Could not find a blog with title " + blogTitle);
      }
    });
  }
}

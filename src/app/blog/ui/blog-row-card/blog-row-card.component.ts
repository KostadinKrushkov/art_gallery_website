import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { DataStorageService } from 'src/app/shared/data-access/data-storage.service';
import { Blog } from 'src/app/shared/models/entity.models';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { BrowserUtilities } from 'src/app/shared/utils/utility-functions';


@Component({
  selector: 'app-blog-row-card',
  templateUrl: './blog-row-card.component.html',
  styleUrls: ['./blog-row-card.component.css']
})
export class BlogRowCardComponent implements OnInit {

  @Input()
  public blog: Blog | undefined;
  public sanitized_content: SafeHtml = '';
  public plain_text_content: string = '';
  public contains_image: boolean = false;

  constructor(public sanitizer: DomSanitizer, private router: Router, private authenticationService: AuthenticationService,
    private dataStorageService: DataStorageService, private popupNotificationService: PopupNotificationsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.blog?.image && this.blog?.image.length > 0) {
      this.contains_image = true;
    }
  }

  ngOnChanges(): void {
    if (this.blog) {
      this.plain_text_content = this.convertToPlain(this.blog.content);
    }
  }

  convertToPlain(html: any) {
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;

    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  onClick(title: string) {
    this.router.navigate(['/blog/' + title]);
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  open(event: Event) {
    event.stopPropagation(); // To stop the parent on click effect
  }

  editBlog(blog: Blog) {
    this.router.navigate(['/blog/edit/' + blog.title]);
  }

  deleteBlog(blog: Blog) {
    if (confirm("Are you sure you want to delete: " + blog.title)) {
      this.dataStorageService.deleteBlog(blog.title).subscribe((response) => {
        this.popupNotificationService.showResponse(response);
        this.reloadCurrentPage();
      }, (error) => {
        this.popupNotificationService.showResponse(error);
      });
    }
  }

  reloadCurrentPage() {
    BrowserUtilities.reloadCurrentPage();
  }
}

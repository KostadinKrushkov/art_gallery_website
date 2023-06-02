import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthenticationService } from './auth/data-access/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'template-project';

  public showMenuButton: boolean = false;
  public route: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.onWindowResize();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        this.route = urlSegments[1];

        if (this.route === 'auth') {
          this.route = this.route + '/' + urlSegments[2];
        }
      });
  }

  isLoggedIn() {
    return this.authenticationService.isAuthenticated();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?: Event) {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      this.showMenuButton = false;
    } else {
      this.showMenuButton = true;
    }
  }
}

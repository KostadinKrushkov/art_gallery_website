import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened = true;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }
}

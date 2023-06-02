import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService, private location: Location) { }

  ngOnInit(): void {
    if (confirm("Are you sure you want to log out?")) {
      this.authService.logout();
    } else {
      this.location.back();
    }
  }
}

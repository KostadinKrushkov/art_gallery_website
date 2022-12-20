import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/data-access/authentication.service';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private popupNotificationService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: (response: any) => {
        console.log("what")
        console.log(response)
        this.popupNotificationService.showResponse(response);
      }, error: (error: any) => {
        console.log("error")
        console.log(error);
        this.popupNotificationService.showResponse(error);
      }, complete: () => {}
    })
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AuthenticationResponse, BasicResponse } from '../models/authentication.models';


@Injectable({
  providedIn: 'root'
})
export class PopupNotificationsService {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  showSuccessfulMessage(message: string) {
    this.notifier.notify('success', message);
  }

  showWarningMessage(message: string) {
    this.notifier.notify('warning', message);
  }

  showErrorMessage(message: string) {
    this.notifier.notify('error', message);
  }

  showResponse<T>(response: BasicResponse<T> | AuthenticationResponse | HttpErrorResponse) {
    if (response instanceof HttpErrorResponse) {
      let message = '';
      if (response.error.message) {
        message = response.error.message;
      } else {
        message = response.message;
      }
      this.showErrorMessage(message);
    } else if ([200, 201].includes(response.status_code)) {
      this.showSuccessfulMessage(response.message);
    } else {
      this.showErrorMessage(response.message);
    }
  }
}

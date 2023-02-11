import { Injectable } from '@angular/core';
import { BaseHttpService } from '../data-access/base-http.service';
import { ServerConfigConstants } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SmtpService extends BaseHttpService {
  sendEmail(email: string, name: string, message: string, recaptcha: string) {
    var params = {email: email, name: name, message: message, recaptcha: recaptcha};
    return this.post(ServerConfigConstants.BACKEND_ADDRESS + '/send_email', params);
  }
}
// move to services folder

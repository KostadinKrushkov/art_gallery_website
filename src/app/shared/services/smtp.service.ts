import { Injectable } from '@angular/core';
import { BaseHttpService } from '../data-access/base-http.service';
import { ServerConfigConstants } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SmtpService extends BaseHttpService {
  sendEmail(email: string, name: string, message: string) {
    const payload = {
      email: email,
      name: name,
      message: message
    }

    return this.post(ServerConfigConstants.BACKEND_ADDRESS + '/send_email', payload);
  }
}
// move to services folder

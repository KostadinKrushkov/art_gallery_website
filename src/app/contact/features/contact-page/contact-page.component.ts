// import { BasicResponse } from '../../../shared/models/authentication.models';
import { BasicResponse } from 'src/app/shared/models/authentication.models';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupNotificationsService } from 'src/app/shared/services/popup-notifications.service';
import { SmtpService } from 'src/app/shared/services/smtp.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  public businessEmail = 'rumenplamenovart.business@gmail.com';
  public personalEmail = 'rumenplamenovart@gmail.com';
  public instagramURL = 'https://www.instagram.com/rumenplamenovart/'
  public submitted = false;
  public siteKey: string = '6Lfu-WYkAAAAAGzn54L1sUWnYN3Vbb2dkn99h-dF';

  public myForm = new FormGroup({
    email: new FormControl('', [Validators.required,  Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    recaptcha: new FormControl('', Validators.required),
  });

  constructor(private popupNotificationsService: PopupNotificationsService, private smtpService: SmtpService) { }

  ngOnInit(): void {
  }

  get formControl() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    const email = this.myForm.controls['email'].value;
    const name = this.myForm.controls['name'].value;
    const message = this.myForm.controls['message'].value;
    const recaptcha = this.myForm.controls['recaptcha'].value;

    if (this.myForm.valid && email && name && message && recaptcha) {
      this.smtpService.sendEmail(email, name, message, recaptcha).subscribe({
        next: (response: any) => {
          this.popupNotificationsService.showSuccessfulMessage(response.message);
          this.myForm.reset();
          this.submitted = false;
        }, error: (error) => {
          this.popupNotificationsService.showErrorMessage(error.message); // test when the ssl is added to see the correct error message
        }, complete: () => {}
      })
    }
  }

  sendToBusinessMail() {
    const subject = 'Business query';
    const mailInfo = `mailto:${this.businessEmail}?subject=${subject}`;
    window.location.href = mailInfo;
    }


  sendToPersonalMail() {
    const subject = 'Personal query';
    const mailInfo = `mailto:${this.personalEmail}?subject=${subject}`;
    window.location.href = mailInfo;  }
}

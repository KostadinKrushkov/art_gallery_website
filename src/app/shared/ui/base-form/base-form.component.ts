import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormActionsConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-picture-form',
  template: ``,
  styleUrls: []
})
export class BaseFormComponent implements OnInit {
  public myForm: FormGroup = new FormGroup({});
  public buttonMessage = "";
  public submitted = false;
  public is_loading = false;

  public formType = ""
  @Input() public mode: string = FormActionsConstants.CREATE

  ngOnInit(): void {
      this.refreshButtonMessage();
  }

  refreshButtonMessage() {
    this.buttonMessage = `${this.mode} ${this.formType}`;
  }

  get registerFormControl() {
    if (this.myForm) {
      return this.myForm.controls
    }

    return this.myForm
  }

  onSubmit(form: FormGroup) {
    throw new Error("Not implemented")
  }
}

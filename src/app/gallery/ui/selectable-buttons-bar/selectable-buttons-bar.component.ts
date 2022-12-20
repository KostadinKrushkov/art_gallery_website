import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-selectable-buttons-bar',
  templateUrl: './selectable-buttons-bar.component.html',
  styleUrls: ['./selectable-buttons-bar.component.css']
})
export class SelectableButtonsBarComponent implements OnInit {
  @Output()
  public selectedButtonNamesEvent = new EventEmitter<string[]>();

  @Input()
  public buttonNames: string[] = []

  @Input()
  public btnType: string = '';
  public activeButtonIndexes: number[] = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    let indexOfAllBtn = this.buttonNames.indexOf('All');
    if (indexOfAllBtn >= 0 && this.activeButtonIndexes.length == 0) {
      this.activeButtonIndexes.push(indexOfAllBtn);
    }

    this.sendSelectedButtonsEvent();
  }

  isButtonSelected(buttonName: string) {
    const clickedButtonIndex = this.buttonNames.indexOf(buttonName);
    return this.activeButtonIndexes.includes(clickedButtonIndex);
  }

  sendSelectedButtonsEvent() {
    this.selectedButtonNamesEvent.emit(this.getSelectedButtons());
  }

  getSelectedButtons() {
    return this.buttonNames.filter((obj) => {
      const buttonIndex = this.buttonNames.indexOf(obj);
      return this.activeButtonIndexes.includes(buttonIndex);
    })
  }

  clickButton(buttonName: string) {
    const clickedButtonIndex = this.buttonNames.indexOf(buttonName);
    if (this.activeButtonIndexes.includes(clickedButtonIndex)) {
      // Disable button
      const index = this.activeButtonIndexes.indexOf(clickedButtonIndex);
      this.activeButtonIndexes.splice(index, 1);
    } else {
      // Enable button and remove all if set
      this.activeButtonIndexes.push(clickedButtonIndex);
      let indexOfAllBtn = this.activeButtonIndexes.indexOf(this.buttonNames.indexOf('All'));
      if (buttonName !== 'All' && this.activeButtonIndexes.includes(indexOfAllBtn)) {
        this.activeButtonIndexes.splice(indexOfAllBtn, 1);
      }
    }
  }
}

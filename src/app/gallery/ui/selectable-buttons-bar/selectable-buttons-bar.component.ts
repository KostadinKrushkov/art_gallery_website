import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-selectable-buttons-bar',
  templateUrl: './selectable-buttons-bar.component.html',
  styleUrls: ['./selectable-buttons-bar.component.scss']
})
export class SelectableButtonsBarComponent implements OnInit {
  @Output()
  public selectedButtonNamesEvent = new EventEmitter<string[]>();

  @Input() public buttonNames: string[] = []
  @Input() public instanceId: number | null = null;

  @Input()
  public btnType: string = '';
  public activeButtonIndexes: number[] = [];
  private initialLoading = true;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any): void {
    // Since the component is reused it shares the same instance, this paramter is used so that the component changes the value for only itself instead of both instances
    if (changes.instanceId) {
      let indexOfAllBtn = this.buttonNames.indexOf('All');
      if (indexOfAllBtn >= 0 && this.activeButtonIndexes.length == 0) {
        this.activeButtonIndexes.push(indexOfAllBtn);
      }

      this.changeInitialLoadingFlagOrEmitEvent(changes);
    }
  }

  changeInitialLoadingFlagOrEmitEvent(changes: any) {
    if (!this.initialLoading) {
      this.sendSelectedButtonsEvent();
    }

    if (changes.buttonNames && changes.buttonNames.previousValue === undefined) {
      this.initialLoading = false;
    }
  }

  isButtonSelected(buttonName: string) {
    const clickedButtonIndex = this.buttonNames.indexOf(buttonName);
    return this.activeButtonIndexes.includes(clickedButtonIndex);
  }

  sendSelectedButtonsEvent() {
    const buttonNames = this.getSelectedButtons();
    const index = buttonNames.indexOf('All');
    if (index !== -1) {
      buttonNames.splice(index, 1);
    }
    this.selectedButtonNamesEvent.emit(buttonNames);
  }

  getSelectedButtons() {
    return this.buttonNames.filter((obj) => {
      const buttonIndex = this.buttonNames.indexOf(obj);
      return this.activeButtonIndexes.includes(buttonIndex);
    })
  }

  clickButton(buttonName: string) {
    const clickedButtonIndex = this.buttonNames.indexOf(buttonName);
    const allButtonIndex = this.buttonNames.indexOf('All');

    if (this.activeButtonIndexes.includes(clickedButtonIndex)) {
      // Disable button
      const index = this.activeButtonIndexes.indexOf(clickedButtonIndex);
      this.activeButtonIndexes.splice(index, 1);
    } else {
      // Enable button
      this.activeButtonIndexes.push(clickedButtonIndex);
      let indexOfAllBtn = this.activeButtonIndexes.indexOf(allButtonIndex);
      if (buttonName !== 'All' && this.activeButtonIndexes.includes(indexOfAllBtn)) {
        this.activeButtonIndexes.splice(indexOfAllBtn, 1);
      } else if (buttonName === 'All') {
        this.activeButtonIndexes = [allButtonIndex];
      }
    }

    if (this.activeButtonIndexes.length === 0) {
      this.activeButtonIndexes.push(allButtonIndex); // When the user deselects the fillters to automatically select 'All' as the option
    }
  }
}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Picture } from 'src/app/shared/models/entity.models';

@Component({
  selector: 'app-favourites-multi-select-dropdown',
  templateUrl: './favourites-multi-select-dropdown.component.html',
  styleUrls: ['./favourites-multi-select-dropdown.component.css']
})
export class FavouritesMultiSelectDropdownComponent implements OnInit {
  @Input() options: Picture[] = [];
  @Input() selectedOptions: Picture[] = [];

  @Output() updateFavouritesEmitter = new EventEmitter();

  dropdownSettings = {};

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'title',
      textField: 'title',
      allowSearchFilter: true,
    } as IDropdownSettings;
  }

  updateFavourites() {
    this.updateFavouritesEmitter.emit(this.selectedOptions);
  }
}

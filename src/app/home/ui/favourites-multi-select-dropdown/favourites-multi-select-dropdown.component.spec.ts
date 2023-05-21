import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesMultiSelectDropdownComponent } from './favourites-multi-select-dropdown.component';

describe('FavouritesMultiSelectDropdownComponent', () => {
  let component: FavouritesMultiSelectDropdownComponent;
  let fixture: ComponentFixture<FavouritesMultiSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesMultiSelectDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

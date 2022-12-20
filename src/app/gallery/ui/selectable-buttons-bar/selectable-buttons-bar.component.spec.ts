import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableButtonsBarComponent } from './selectable-buttons-bar.component';

describe('SelectableButtonsBarComponent', () => {
  let component: SelectableButtonsBarComponent;
  let fixture: ComponentFixture<SelectableButtonsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectableButtonsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectableButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDetailsPopupComponent } from './picture-details-popup.component';

describe('PictureDetailsPopupComponent', () => {
  let component: PictureDetailsPopupComponent;
  let fixture: ComponentFixture<PictureDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

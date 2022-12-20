import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPicturePageComponent } from './edit-picture-page.component';

describe('EditPicturePageComponent', () => {
  let component: EditPicturePageComponent;
  let fixture: ComponentFixture<EditPicturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPicturePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPicturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

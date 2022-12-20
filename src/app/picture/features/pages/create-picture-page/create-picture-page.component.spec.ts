import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePicturePageComponent } from './create-picture-page.component';

describe('CreatePicturePageComponent', () => {
  let component: CreatePicturePageComponent;
  let fixture: ComponentFixture<CreatePicturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePicturePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePicturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

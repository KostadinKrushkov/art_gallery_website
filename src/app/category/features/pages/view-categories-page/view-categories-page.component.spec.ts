import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriesPageComponent } from './view-categories-page.component';

describe('ViewCategoriesPageComponent', () => {
  let component: ViewCategoriesPageComponent;
  let fixture: ComponentFixture<ViewCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoriesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

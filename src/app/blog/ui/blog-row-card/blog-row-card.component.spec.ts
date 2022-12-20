import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRowCardComponent } from './blog-row-card.component';

describe('BlogRowCardComponent', () => {
  let component: BlogRowCardComponent;
  let fixture: ComponentFixture<BlogRowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogRowCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogRowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

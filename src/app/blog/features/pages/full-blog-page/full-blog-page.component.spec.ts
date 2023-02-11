import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBlogPageComponent } from './full-blog-page.component';

describe('FullBlogPageComponent', () => {
  let component: FullBlogPageComponent;
  let fixture: ComponentFixture<FullBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBlogPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

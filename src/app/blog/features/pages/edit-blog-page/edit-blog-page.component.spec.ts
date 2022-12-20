import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogPageComponent } from './edit-blog-page.component';

describe('EditBlogPageComponent', () => {
  let component: EditBlogPageComponent;
  let fixture: ComponentFixture<EditBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlogPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

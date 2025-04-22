import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperCategoryComponent } from './swiper-category.component';

describe('SwiperCategoryComponent', () => {
  let component: SwiperCategoryComponent;
  let fixture: ComponentFixture<SwiperCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

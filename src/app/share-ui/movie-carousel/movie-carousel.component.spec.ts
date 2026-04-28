import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarouselComponent } from './movie-carousel.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('MovieCarouselComponent', () => {
  let component: MovieCarouselComponent;
  let fixture: ComponentFixture<MovieCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

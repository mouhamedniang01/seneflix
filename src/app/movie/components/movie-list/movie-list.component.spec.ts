import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create movie-list.component', () => {
    expect(component).toBeTruthy();
  });
});

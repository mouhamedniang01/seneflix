import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCatalogueComponent } from './movies-catalogue.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
describe('MoviesCatalogueComponent', () => {
  let component: MoviesCatalogueComponent;
  let fixture: ComponentFixture<MoviesCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesCatalogueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

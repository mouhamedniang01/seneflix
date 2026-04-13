import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ReviewServiceService', () => {
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({  providers: [provideZonelessChangeDetection()],});
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

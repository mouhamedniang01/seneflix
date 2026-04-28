import { TestBed } from '@angular/core/testing';

import { CreditService } from './credit.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('CreditService', () => {
  let service: CreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditService);
  });

  it('should be created credit\'s service', () => {
    expect(service).toBeTruthy();
  });
});

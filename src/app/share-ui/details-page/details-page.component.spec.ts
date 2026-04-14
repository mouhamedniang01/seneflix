import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DetailsPageComponent } from './details-page.component';
import testProviders from '../../../test-providers';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPageComponent],
      providers:[testProviders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

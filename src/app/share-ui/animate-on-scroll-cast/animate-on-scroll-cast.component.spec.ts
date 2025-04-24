import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateOnScrollCastComponent } from './animate-on-scroll-cast.component';

describe('AnimateOnScrollCastComponent', () => {
  let component: AnimateOnScrollCastComponent;
  let fixture: ComponentFixture<AnimateOnScrollCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateOnScrollCastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimateOnScrollCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

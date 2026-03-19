import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieByCastingComponent } from './movie.by.casting.component';

describe('MovieByCastingComponent', () => {
  let component: MovieByCastingComponent;
  let fixture: ComponentFixture<MovieByCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieByCastingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieByCastingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

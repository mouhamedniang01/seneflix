import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAutocompleteComponent } from './genre.autocomplete.component';

describe('GenreAutocompleteComponent', () => {
  let component: GenreAutocompleteComponent;
  let fixture: ComponentFixture<GenreAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreAutocompleteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

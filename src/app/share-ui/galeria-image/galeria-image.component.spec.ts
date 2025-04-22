import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaImageComponent } from './galeria-image.component';

describe('GaleriaImageComponent', () => {
  let component: GaleriaImageComponent;
  let fixture: ComponentFixture<GaleriaImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

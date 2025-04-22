import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWidgetComponent } from './dialog-widget.component';

describe('DialogWidgetComponent', () => {
  let component: DialogWidgetComponent;
  let fixture: ComponentFixture<DialogWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

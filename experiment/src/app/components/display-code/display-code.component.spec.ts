import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCodeComponent } from './display-code.component';

describe('DisplayCodeComponent', () => {
  let component: DisplayCodeComponent;
  let fixture: ComponentFixture<DisplayCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncingElementComponent } from './bouncing-element.component';

describe('BouncingElementComponent', () => {
  let component: BouncingElementComponent;
  let fixture: ComponentFixture<BouncingElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouncingElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BouncingElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddleElementComponent } from './paddle-element.component';

describe('PaddleElementComponent', () => {
  let component: PaddleElementComponent;
  let fixture: ComponentFixture<PaddleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaddleElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

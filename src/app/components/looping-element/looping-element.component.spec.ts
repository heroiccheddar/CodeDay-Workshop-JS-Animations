import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopingElementComponent } from './looping-element.component';

describe('LoopingElementComponent', () => {
  let component: LoopingElementComponent;
  let fixture: ComponentFixture<LoopingElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoopingElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopingElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

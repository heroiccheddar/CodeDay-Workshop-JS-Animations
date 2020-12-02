import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCanvasComponent } from './create-canvas.component';

describe('CreateCanvasComponent', () => {
  let component: CreateCanvasComponent;
  let fixture: ComponentFixture<CreateCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

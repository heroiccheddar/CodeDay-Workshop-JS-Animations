import {
  AfterViewInit, Component, Inject, ViewChild,
} from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-shape',
  templateUrl: './select-shape.component.html',
  styleUrls: ['./select-shape.component.scss'],
})
export class SelectShapeComponent implements AfterViewInit {
  @ViewChild('selectShapeCanvas')
  canvas: any;

  context: any;

  color: any = '#fe9200';

  changeColor: boolean = false;

  selectedShape: string;

  constructor(private dialogRef: MatDialogRef<SelectShapeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.selectedShape = this.data.selectedShape;
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.drawShape(this.selectedShape);
  }

  drawShape(selectedShape: string) {
    switch (selectedShape) {
      case 'square':
        this.drawSquare();
        break;
      case 'triangle':
        this.drawTriangle();
        break;
      case 'circle':
        this.drawCircle();
        break;
      default:
        break;
    }
  }

  drawSquare(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.rect(25, 25, 50, 50);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  drawTriangle(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.beginPath();
    this.context.moveTo(10, 90);
    this.context.lineTo(90, 90);
    this.context.lineTo(50, 10);
    this.context.fillStyle = this.color;
    this.context.fill();
  }

  drawCircle(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.beginPath();
    this.context.arc(50, 50, 25, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  // eslint-disable-next-line class-methods-use-this
  colorSelected($event: ColorEvent): void {
    this.color = $event.color.hex;

    this.drawShape(this.selectedShape);
  }

  onConfirm(): void {
    this.dialogRef.close({ confirmed: true, selectedShape: this.selectedShape, color: this.color });
  }

  onCancel(): void {
    this.dialogRef.close({ confirmed: false, selectedShape: this.selectedShape, color: this.color });
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-canvas',
  templateUrl: './create-canvas.component.html',
  styleUrls: ['./create-canvas.component.scss']
})
export class CreateCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvas: any;
  private context: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  addSquare(): void {
    this.context.beginPath();
    this.context.rect(20, 40, 50, 50);
    this.context.fillStyle = '#FF0000';
    this.context.fill();
    this.context.closePath();
  }

  addCircle(): void {
    this.context.beginPath();
    this.context.arc(240, 160, 20, 0, Math.PI * 2, false);
    this.context.fillStyle = 'green';
    this.context.fill();
    this.context.closePath();
  }
}

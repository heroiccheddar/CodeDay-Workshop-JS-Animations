import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import BrickConfig from '../../models/brick-config';

@Component({
  selector: 'app-bricks',
  templateUrl: './bricks.component.html',
  styleUrls: ['./bricks.component.scss'],
})
export class BricksComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas: any;

  context: any;

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  readonly brickConfig: BrickConfig = {
    brickRowCount: 3,
    brickColumnCount: 5,
    brickWidth: 75,
    brickHeight: 20,
    brickSpacing: 10,
    brickTopPadding: 30,
    brickLeftPadding: 30,
  };
}

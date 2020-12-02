import {
  AfterViewInit, Component, HostListener, OnInit, ViewChild,
} from '@angular/core';
// @ts-ignore
import * as config from '../../test/config.json';
import BrickConfig from '../../models/brick-config';
import { PaddleConfig } from '../../models/paddle-config';

@Component({
  selector: 'app-bricks',
  templateUrl: './bricks.component.html',
  styleUrls: ['./bricks.component.scss'],
})
export class BricksComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas')
  canvas: any;

  context: any;

  bricks: any[][] = [[]];

  brickConfig: BrickConfig;

  paddleConfig: PaddleConfig;

  paddleX: number;

  rightPressed: boolean = false;

  leftPressed: boolean = false;

  interval: any;

  x: number;

  y: number;

  dx: number = 2;

  dy: number = -2;

  ballRadius: number = 10;

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    // start this step

    this.paddleX = (this.canvas.width - this.paddleConfig.paddleWidth) / 2;

    // end this step

    this.interval = setInterval(() => {
      this.draw();
    }, 10);
  }

  ngOnInit() {
    this.brickConfig = config.brick;
    this.paddleConfig = config.paddle;

    for (let c = 0; c < this.brickConfig.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickConfig.brickRowCount; r += 1) {
        this.bricks[c][r] = { x: 0, y: 0 };
      }
    }
  }

  drawBricks() {
    for (let i = 0; i < this.brickConfig.brickColumnCount; i += 1) {
      for (let j = 0; j < this.brickConfig.brickRowCount; j += 1) {
        const brickX = (i * (this.brickConfig.brickWidth + this.brickConfig.brickSpacing)) + this.brickConfig.brickLeftPadding;
        const brickY = (j * (this.brickConfig.brickHeight + this.brickConfig.brickSpacing)) + this.brickConfig.brickTopPadding;

        this.bricks[i][j] = {
          x: brickX,
          y: brickY,
        };
        this.context.beginPath();
        this.context.rect(brickX, brickY, this.brickConfig.brickWidth, this.brickConfig.brickHeight);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
      }
    }
  }

  drawPaddle(): void {
    this.context.beginPath();
    this.context.rect(this.paddleX, this.canvas.height - this.paddleConfig.paddleHeight, this.paddleConfig.paddleWidth, this.paddleConfig.paddleHeight);
    this.context.fillStyle = '#0095DD';
    this.context.fill();
    this.context.closePath();
  }

  drawBall(): void {
    this.context.beginPath();
    this.context.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.context.fillStyle = '#0095DD';
    this.context.fill();
    this.context.closePath();
  }

  draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();

    // start this step

    if (this.rightPressed) {
      this.paddleX += 7;
      if (this.paddleX + this.paddleConfig.paddleWidth > this.canvas.width) {
        this.paddleX = this.canvas.width - this.paddleConfig.paddleWidth;
      }
    } else if (this.leftPressed) {
      this.paddleX -= 7;
      if (this.paddleX < 0) {
        this.paddleX = 0;
      }
    }

    // end this step

    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }

    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleConfig.paddleWidth) {
        this.dy = -this.dy;
      } else {
        // eslint-disable-next-line no-alert
        // alert('GAME OVER');
        document.location.reload();
        clearInterval(this.interval); // Needed for Chrome to end game
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  // eslint-disable-next-line class-methods-use-this
  @HostListener('document:keydown.ArrowLeft', ['$event']) onLeftArrowKeydownHandler() {
    this.leftPressed = true;
  }

  // eslint-disable-next-line class-methods-use-this
  @HostListener('document:keyup.ArrowLeft', ['$event']) onLeftArrowKeyupHandler() {
    this.leftPressed = false;
  }

  // eslint-disable-next-line class-methods-use-this
  @HostListener('document:keydown.ArrowRight', ['$event']) onRightArrowKeydownHandler() {
    this.rightPressed = true;
  }

  // eslint-disable-next-line class-methods-use-this
  @HostListener('document:keyup.ArrowRight', ['$event']) onRightArrowKeyupHandler() {
    this.rightPressed = false;
  }
}

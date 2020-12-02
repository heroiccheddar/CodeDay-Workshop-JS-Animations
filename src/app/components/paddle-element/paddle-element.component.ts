import {
  AfterViewInit, Component, HostListener, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paddle-element',
  templateUrl: './paddle-element.component.html',
  styleUrls: ['./paddle-element.component.scss'],
})
export class PaddleElementComponent implements AfterViewInit {
  readonly ballRadius: number = 10;

  @ViewChild('canvas')
  canvas: any;

  context: any;

  x: number;

  y: number;

  dx: number = 2;

  dy: number = -2;

  // start this step
  paddleHeight: number = 10;

  paddleWidth: number = 75;

  paddleX: number;

  rightPressed: boolean = false;

  leftPressed: boolean = false;

  interval: any;

  // end this step
  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    // start this step

    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

    // end this step

    this.interval = setInterval(() => {
      this.draw();
    }, 10);
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

    // start this step

    if (this.rightPressed) {
      this.paddleX += 7;
      if (this.paddleX + this.paddleWidth > this.canvas.width) {
        this.paddleX = this.canvas.width - this.paddleWidth;
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
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
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

  nextStep(): void {
    this.router.navigateByUrl('/stepFive');
  }

  // start this step

  drawPaddle(): void {
    this.context.beginPath();
    this.context.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.context.fillStyle = '#0095DD';
    this.context.fill();
    this.context.closePath();
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

  // end this step
}

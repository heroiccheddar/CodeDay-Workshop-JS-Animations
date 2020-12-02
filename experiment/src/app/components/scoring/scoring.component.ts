import {
  AfterViewInit, Component, HostListener, OnInit, ViewChild,
} from '@angular/core';
// @ts-ignore
import * as config from '../../test/config.json';
import BrickConfig from '../../models/brick-config';
import { PaddleConfig } from '../../models/paddle-config';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss'],
})
export class ScoringComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas')
  canvas: any;

  context: any;

  bricks: any[][] = [[]];

  shapeConfig: any;

  brickConfig: BrickConfig;

  paddleConfig: PaddleConfig;

  messageConfig: any;

  paddleX: number;

  rightPressed: boolean = false;

  leftPressed: boolean = false;

  interval: any;

  x: number;

  y: number;

  dx: number = 2;

  dy: number = -2;

  ballRadius: number = 10;

  score: number = 0;

  lives: number = 3;

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
    this.shapeConfig = config.shape;
    this.messageConfig = config.messages;

    for (let c = 0; c < this.brickConfig.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickConfig.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickConfig.brickColumnCount; c++) {
      for (let r = 0; r < this.brickConfig.brickRowCount; r++) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (this.x > b.x && this.x < b.x + this.brickConfig.brickWidth && this.y > b.y && this.y < b.y + this.brickConfig.brickHeight) {
            this.dy = -this.dy;
            b.status = 0;
            this.score++;
            if (this.score === this.brickConfig.brickRowCount * this.brickConfig.brickColumnCount) {
              alert(this.messageConfig.gameWon);
              document.location.reload();
              clearInterval(this.interval); // Needed for Chrome to end game
            }
          }
        }
      }
    }
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.context.fillStyle = this.shapeConfig.color;
    this.context.fill();
    this.context.closePath();
  }

  drawPaddle() {
    this.context.beginPath();
    this.context.rect(this.paddleX, this.canvas.height - this.paddleConfig.paddleHeight, this.paddleConfig.paddleWidth, this.paddleConfig.paddleHeight);
    this.context.fillStyle = '#0095DD';
    this.context.fill();
    this.context.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.brickConfig.brickColumnCount; c++) {
      for (let r = 0; r < this.brickConfig.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.brickConfig.brickWidth + this.brickConfig.brickSpacing)) + this.brickConfig.brickLeftPadding;
          const brickY = (r * (this.brickConfig.brickHeight + this.brickConfig.brickSpacing)) + this.brickConfig.brickTopPadding;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.context.beginPath();
          this.context.rect(brickX, brickY, this.brickConfig.brickWidth, this.brickConfig.brickHeight);
          this.context.fillStyle = this.brickConfig.color;
          this.context.fill();
          this.context.closePath();
        }
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.collisionDetection();

    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleConfig.paddleWidth) {
        this.dy = -this.dy;
      } else {
        this.lives--;
        if (!this.lives) {
          alert(this.messageConfig.gameOver);
          document.location.reload();
          clearInterval(this.interval); // Needed for Chrome to end game
        } else {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height - 30;
          this.dx = 2;
          this.dy = -2;
          this.paddleX = (this.canvas.width - this.paddleConfig.paddleWidth) / 2;
        }
      }
    }

    if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleConfig.paddleWidth) {
      this.paddleX += 7;
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  drawScore() {
    this.context.font = '16px Arial';
    this.context.fillStyle = '#0095DD';
    this.context.fillText(`Score: ${(this.score)}`, 8, 20);
  }

  drawLives() {
    this.context.font = '16px Arial';
    this.context.fillStyle = '#0095DD';
    this.context.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
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

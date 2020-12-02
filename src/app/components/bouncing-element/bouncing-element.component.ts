import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-bouncing-element',
  templateUrl: './bouncing-element.component.html',
  styleUrls: ['./bouncing-element.component.scss'],
})
export class BouncingElementComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas: any;

  context: any;

  ballRadius: number = 10;

  x: number;

  y: number;

  dx: number = 2;

  dy: number = -2;

  selectedShape: string;

  selectedColor: string;

  stepFourJs: string = '';

  stepFourHtml: string = '';

  stepFourCss: string = '';

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) { }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    this.ballRadius *= this.breadcrumbService.selectedSize;
    this.selectedShape = this.breadcrumbService.selectedShape;
    this.selectedColor = this.breadcrumbService.selectedColor;

    setInterval(() => {
      this.draw();
    }, 10);
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.context.fillStyle = this.breadcrumbService.selectedColor;
    this.context.fill();
    this.context.closePath();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();

    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  nextStep(): void {
    this.router.navigateByUrl('/stepFour');
  }

  previousStep(): void {
    this.router.navigateByUrl('/stepTwo');
  }

  generateStepFourJS(): void {
    this.stepFourJs = '';
    this.stepFourJs += 'let canvas = document.getElementById("canvas");\n';
    this.stepFourJs += 'let ctx = canvas.getContext("2d");\n';
    this.stepFourJs += 'let x = canvas.width / 2;\n';
    this.stepFourJs += 'let y = canvas.height - 30;\n';
    this.stepFourJs += `let size = ${this.breadcrumbService.selectedSize}\n`;
    this.stepFourJs += 'let dx = 2;\n';
    this.stepFourJs += 'let dy = -2;\n';

    switch (this.selectedShape) {
      case 'square':
        this.stepFourJs += 'let squareWidth = 10;\n';
        this.stepFourJs += 'let squareHeight = 10;\n\n';
        this.stepFourJs += 'function drawSquare() {\n';
        this.stepFourJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepFourJs += '  ctx.beginPath();\n';
        this.stepFourJs += '  ctx.rect(x, y, squareWidth, squareHeight);\n';
        this.stepFourJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepFourJs += '  ctx.fill();\n';
        this.stepFourJs += '  ctx.closePath();\n';
        this.stepFourJs += '}\n\n';
        this.stepFourJs += 'function draw() {\n';
        this.stepFourJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepFourJs += '  drawSquare();\n';
        this.stepFourJs += '  x += dx;\n';
        this.stepFourJs += '  y += dy;\n';
        this.stepFourJs += '}\n\n';
        break;
      case 'circle':
        this.stepFourJs += 'let circleRadius = 10;\n\n';
        this.stepFourJs += 'function drawCircle() {\n';
        this.stepFourJs += '  ctx.beginPath();\n';
        this.stepFourJs += '  ctx.arc(x, y, circleRadius * size, 0, Math.PI*2);\n';
        this.stepFourJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepFourJs += '  ctx.fill();\n';
        this.stepFourJs += '  ctx.closePath();\n';
        this.stepFourJs += '}\n\n';
        this.stepFourJs += 'function draw() {\n';
        this.stepFourJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepFourJs += '  drawCircle();\n';
        this.stepFourJs += '  x += dx;\n';
        this.stepFourJs += '  y += dy;\n';
        this.stepFourJs += '}\n\n';
        break;
      case 'triangle':
        this.stepFourJs += 'let size = 10;\n';
        this.stepFourJs += 'let height = size * (Math.sqrt(3)/2);\n\n';

        this.stepFourJs += 'function drawTriangle() {\n';
        this.stepFourJs += '  ctx.beginPath();\n';
        this.stepFourJs += '  ctx.moveTo(x, y);\n';
        this.stepFourJs += '  ctx.lineTo(x + (height / 2), y + height);\n';
        this.stepFourJs += '  ctx.lineTo(x - (height / 2), y + height);\n';
        this.stepFourJs += '  ctx.lineTo(x, y);\n';
        this.stepFourJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepFourJs += '  ctx.fill();\n';
        this.stepFourJs += '  ctx.closePath();\n';
        this.stepFourJs += '}\n\n';

        this.stepFourJs += 'function draw() {\n';
        this.stepFourJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepFourJs += '  drawTriangle();\n';
        this.stepFourJs += '  x += dx;\n';
        this.stepFourJs += '  y += dy;\n';
        this.stepFourJs += '}\n\n';
        break;
      default:
        break;
    }

    this.stepFourJs += '// Call the draw function every 10 milliseconds\n';
    this.stepFourJs += 'setInterval(draw, 10);';
  }
}

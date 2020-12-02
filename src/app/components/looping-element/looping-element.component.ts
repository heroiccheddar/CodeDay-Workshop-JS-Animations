import {
  AfterViewInit, Component, OnInit, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { isNullOrUndefined } from 'util';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-looping-element',
  templateUrl: './looping-element.component.html',
  styleUrls: ['./looping-element.component.scss'],
})
export class LoopingElementComponent implements OnInit, AfterViewInit {
  readonly dx: number = 2;

  readonly dy: number = -2;

  @ViewChild('canvas')
  canvas: any;

  context: any;

  x: number;

  y: number;

  selectedColor: string;

  selectedShape: string;

  clicked: boolean = false;

  launched: boolean = false;

  selectedSize: number = 1;

  stepThreeHtml: string = 'No HTML changes needed for this step';

  stepThreeJs: string = '';

  stepThreeCss: string = 'No CSS changes needed for this step';

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.selectedColor = this.breadcrumbService.selectedColor;
    this.selectedShape = this.breadcrumbService.selectedShape;

    if (this.selectedShape === null || this.selectedShape === undefined) {
      this.previousStep();
    }

    this.stepThreeJs = `Launch your ${this.selectedShape} to discover its secrets.`;
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    this.launched = true;
    this.draw();
    this.launched = false;
  }

  reset(): void {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.draw();
    this.clicked = false;
    this.launched = false;
  }

  launch(): void {
    this.clicked = true;
    this.launched = true;

    setInterval(() => {
      this.draw();
    }, 10);

    this.generateStepThreeJS();
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, 10 * this.selectedSize, 0, Math.PI * 2);
    this.context.fillStyle = isNullOrUndefined(this.selectedColor) ? '#0095DD' : this.selectedColor;
    this.context.fill();
    this.context.closePath();
  }

  drawSquare() {
    this.context.beginPath();
    this.context.rect(this.x, this.y, 10 * this.selectedSize, 10 * this.selectedSize);
    this.context.fillStyle = this.selectedColor;
    this.context.fill();
    this.context.closePath();
  }

  drawTriangle() {
    const size = 15;
    const height = (size * (Math.sqrt(3) / 2)) * this.selectedSize;

    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + (height / 2), this.y + height);
    this.context.lineTo(this.x - (height / 2), this.y + height);
    this.context.lineTo(this.x, this.y);
    this.context.fillStyle = this.selectedColor;
    this.context.fill();
    this.context.closePath();
  }

  draw() {
    if (this.launched) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      switch (this.selectedShape) {
        case 'square':
          this.drawSquare();
          break;
        case 'triangle':
          this.drawTriangle();
          break;
        case 'circle':
          this.drawBall();
          break;
        default:
          break;
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }

  nextStep(): void {
    this.router.navigateByUrl('/stepThree');
  }

  previousStep(): void {
    this.router.navigateByUrl('/stepOne');
  }

  increaseSize(): void {
    this.selectedSize *= 1.1;

    if (this.selectedSize > 2) {
      this.selectedSize = 2;
    }

    this.breadcrumbService.selectedSize = this.selectedSize;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.launched = true;
    this.draw();
    this.launched = false;
    this.generateStepThreeJS();
  }

  decreaseSize(): void {
    this.selectedSize /= 1.1;

    if (this.selectedSize < 1) {
      this.selectedSize = 1;
    }

    this.breadcrumbService.selectedSize = this.selectedSize;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.launched = true;
    this.draw();
    this.launched = false;
    this.generateStepThreeJS();
  }

  generateStepThreeJS(): void {
    this.stepThreeJs = '';
    this.stepThreeJs += 'let canvas = document.getElementById("canvas");\n';
    this.stepThreeJs += 'let ctx = canvas.getContext("2d");\n';
    this.stepThreeJs += 'let x = canvas.width / 2;\n';
    this.stepThreeJs += 'let y = canvas.height - 30;\n';
    this.stepThreeJs += `let size = ${this.breadcrumbService.selectedSize}\n`;
    this.stepThreeJs += 'let dx = 2;\n';
    this.stepThreeJs += 'let dy = -2;\n';

    switch (this.selectedShape) {
      case 'square':
        this.stepThreeJs += 'let squareWidth = 10;\n';
        this.stepThreeJs += 'let squareHeight = 10;\n\n';
        this.stepThreeJs += 'function drawSquare() {\n';
        this.stepThreeJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepThreeJs += '  ctx.beginPath();\n';
        this.stepThreeJs += '  ctx.rect(x, y, squareWidth, squareHeight);\n';
        this.stepThreeJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepThreeJs += '  ctx.fill();\n';
        this.stepThreeJs += '  ctx.closePath();\n';
        this.stepThreeJs += '}\n\n';
        this.stepThreeJs += 'function draw() {\n';
        this.stepThreeJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepThreeJs += '  drawSquare();\n';
        this.stepThreeJs += '  x += dx;\n';
        this.stepThreeJs += '  y += dy;\n';
        this.stepThreeJs += '}\n\n';
        break;
      case 'circle':
        this.stepThreeJs += 'let circleRadius = 10;\n\n';
        this.stepThreeJs += 'function drawCircle() {\n';
        this.stepThreeJs += '  ctx.beginPath();\n';
        this.stepThreeJs += '  ctx.arc(x, y, circleRadius * size, 0, Math.PI*2);\n';
        this.stepThreeJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepThreeJs += '  ctx.fill();\n';
        this.stepThreeJs += '  ctx.closePath();\n';
        this.stepThreeJs += '}\n\n';
        this.stepThreeJs += 'function draw() {\n';
        this.stepThreeJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepThreeJs += '  drawCircle();\n';
        this.stepThreeJs += '  x += dx;\n';
        this.stepThreeJs += '  y += dy;\n';
        this.stepThreeJs += '}\n\n';
        break;
      case 'triangle':
        this.stepThreeJs += 'let size = 10;\n';
        this.stepThreeJs += 'let height = size * (Math.sqrt(3)/2);\n\n';

        this.stepThreeJs += 'function drawTriangle() {\n';
        this.stepThreeJs += '  ctx.beginPath();\n';
        this.stepThreeJs += '  ctx.moveTo(x, y);\n';
        this.stepThreeJs += '  ctx.lineTo(x + (height / 2), y + height);\n';
        this.stepThreeJs += '  ctx.lineTo(x - (height / 2), y + height);\n';
        this.stepThreeJs += '  ctx.lineTo(x, y);\n';
        this.stepThreeJs += `  ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepThreeJs += '  ctx.fill();\n';
        this.stepThreeJs += '  ctx.closePath();\n';
        this.stepThreeJs += '}\n\n';

        this.stepThreeJs += 'function draw() {\n';
        this.stepThreeJs += '  ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepThreeJs += '  drawTriangle();\n';
        this.stepThreeJs += '  x += dx;\n';
        this.stepThreeJs += '  y += dy;\n';
        this.stepThreeJs += '}\n\n';
        break;
      default:
        break;
    }

    this.stepThreeJs += '// Call the draw function every 10 milliseconds\n';
    this.stepThreeJs += 'setInterval(draw, 10);';
  }
}

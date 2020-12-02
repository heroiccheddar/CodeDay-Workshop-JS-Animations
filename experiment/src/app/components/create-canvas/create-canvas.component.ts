import {
  AfterViewInit, Component, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectShapeComponent } from './select-shape/select-shape.component';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-create-canvas',
  templateUrl: './create-canvas.component.html',
  styleUrls: ['./create-canvas.component.scss'],
})
export class CreateCanvasComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas: any;

  context: any;

  color: any = '#fe9200';

  selectedShape: string = null;

  selectedColor: string;

  stepTwoHtml: string = '';

  stepTwoJs: string = '';

  stepTwoCss: string = '';

  nextButtonDisabled: boolean = true;

  constructor(private router: Router, private dialog: MatDialog, private breadcrumbService: BreadcrumbService) { }

  ngAfterViewInit(): void {
    this.canvas = this.canvas.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  nextStep(): void {
    this.router.navigateByUrl('/stepTwo');
  }

  previousStep(): void {
    this.router.navigateByUrl('/');
  }

  openConfirmationDialog(selectedShape: string): void {
    const dialogRef = this.dialog.open(SelectShapeComponent, {
      height: '350px',
      width: '400px',
      data: {
        selectedShape,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult?.confirmed) {
        this.selectedColor = dialogResult.color;
        this.color = dialogResult.color;
        this.selectedShape = dialogResult.selectedShape;

        this.breadcrumbService.selectedColor = dialogResult.color;
        this.breadcrumbService.selectedShape = dialogResult.selectedShape;

        this.drawShape(this.selectedShape);

        this.generateStepTwoHTML();
        this.generateStepTwoJS();
        this.generateStepTwoCSS();
        this.nextButtonDisabled = false;
      }
    });
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

  generateStepTwoJS(): void {
    this.stepTwoJs += 'let canvas = document.getElementById("canvas");\n';
    this.stepTwoJs += 'let ctx = canvas.getContext("2d");\n';

    switch (this.selectedShape) {
      case 'square':
        this.stepTwoJs += 'let squareWidth = 50;\n';
        this.stepTwoJs += 'let squareHeight = 50;\n\n';
        this.stepTwoJs += `ctx.clearRect(0, 0, canvas.width, canvas.height);\nctx.beginPath();\nctx.rect(canvas.width / 2 - (squareWidth / 2), canvas.height / 2 - (squareHeight / 2), squareWidth, squareHeight);\nctx.fillStyle = "${this.selectedColor}";\nctx.fill();\nctx.closePath();`;
        break;
      case 'circle':
        this.stepTwoJs += 'let circleRadius = 50;\n\n';
        this.stepTwoJs += 'ctx.clearRect(0, 0, canvas.width, canvas.height);\n';
        this.stepTwoJs += 'ctx.beginPath();\n';
        this.stepTwoJs += 'ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2, false);\n';
        this.stepTwoJs += `ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepTwoJs += 'ctx.fill();\n';
        this.stepTwoJs += 'ctx.closePath();';
        break;

      case 'triangle':
        this.stepTwoJs += 'let size = 100;\n';
        this.stepTwoJs += 'let height = size * (Math.sqrt(3)/2);\n';
        this.stepTwoJs += 'let x = canvas.width / 2;\n';
        this.stepTwoJs += 'let y = canvas.height / 2 - (height / 2);\n\n';
        this.stepTwoJs += 'ctx.beginPath();\n';
        this.stepTwoJs += 'ctx.moveTo(x, y);\n';
        this.stepTwoJs += 'ctx.lineTo(x + (height / 2), y + height);\n';
        this.stepTwoJs += 'ctx.lineTo(x - (height / 2), y + height);\n';
        this.stepTwoJs += 'ctx.lineTo(x, y);\n';
        this.stepTwoJs += `ctx.fillStyle = "${this.selectedColor}";\n`;
        this.stepTwoJs += 'ctx.fill();\n';
        this.stepTwoJs += 'ctx.closePath();\n';
        break;

      default:
        break;
    }
  }

  generateStepTwoHTML() {
    this.stepTwoHtml = 'No HTML changes are needed for this step.';
  }

  generateStepTwoCSS() {
    this.stepTwoCss = 'No CSS changes are needed for this step';
  }
}

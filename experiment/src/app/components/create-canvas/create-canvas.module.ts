import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorCompactModule } from 'ngx-color/compact';
import { MatButtonModule } from '@angular/material/button';
import { CreateCanvasComponent } from './create-canvas.component';
import { SelectShapeComponent } from './select-shape/select-shape.component';
import { CommonModule } from '@angular/common';
import { DisplayCodeModule } from '../display-code/display-code.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    CreateCanvasComponent,
    SelectShapeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    MatDialogModule,
    ColorCompactModule,
    MatButtonModule,
    CommonModule,
    DisplayCodeModule
  ],
  providers: [],
})
export class CreateCanvasModule { }

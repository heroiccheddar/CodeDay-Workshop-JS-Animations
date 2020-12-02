import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { LoopingElementComponent } from './looping-element.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DisplayCodeModule } from '../display-code/display-code.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    LoopingElementComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    CommonModule,
    MatButtonModule,
    DisplayCodeModule
  ],
  providers: [],
})
export class LoopingElementModule { }

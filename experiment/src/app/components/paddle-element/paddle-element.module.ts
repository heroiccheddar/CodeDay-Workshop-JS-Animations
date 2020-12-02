import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { PaddleElementComponent } from './paddle-element.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    PaddleElementComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
  ],
  providers: [],
})
export class PaddleElementModule { }

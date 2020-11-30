import {NgModule} from '@angular/core';
import {CreateCanvasComponent} from './create-canvas.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';

const routes: Routes = [];

@NgModule({
  declarations: [
    CreateCanvasComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule
  ],
  providers: [],
})
export class CreateCanvasModule { }

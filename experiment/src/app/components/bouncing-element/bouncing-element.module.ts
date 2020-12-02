import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { BouncingElementComponent } from './bouncing-element.component';
import { DisplayCodeModule } from '../display-code/display-code.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    BouncingElementComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    DisplayCodeModule
  ],
  providers: [],
})
export class BouncingElementModule { }

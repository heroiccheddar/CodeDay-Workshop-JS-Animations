import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { DisplayCodeComponent } from './display-code.component';

@NgModule({
  declarations: [
    DisplayCodeComponent
  ],
  imports: [
    RouterModule,
    FlexModule
  ],
  providers: [],
  exports: [
    DisplayCodeComponent
  ]
})
export class DisplayCodeModule { }

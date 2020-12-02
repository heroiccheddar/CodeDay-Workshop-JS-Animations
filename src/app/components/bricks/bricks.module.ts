import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BricksComponent } from './bricks.component';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BricksComponent,
  ],
  imports: [
    RouterModule,
    FlexModule
  ],
  providers: [],
})
export class BricksModule { }

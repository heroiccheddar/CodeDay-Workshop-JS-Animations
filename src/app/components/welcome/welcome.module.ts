import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './welcome.component';
import { DisplayCodeModule } from '../display-code/display-code.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    MatButtonModule,
    DisplayCodeModule
  ],
  providers: [],
})
export class WelcomeModule { }

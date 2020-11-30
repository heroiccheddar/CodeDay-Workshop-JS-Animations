import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCanvasComponent} from './components/create-canvas/create-canvas.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'stepOne', component: CreateCanvasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

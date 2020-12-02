import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCanvasComponent } from './components/create-canvas/create-canvas.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoopingElementComponent } from './components/looping-element/looping-element.component';
import { BouncingElementComponent } from './components/bouncing-element/bouncing-element.component';
import { PaddleElementComponent } from './components/paddle-element/paddle-element.component';
import { BricksComponent } from './components/bricks/bricks.component';
import { CollisionComponent } from './components/collision/collision.component';
import { ScoringComponent } from './components/scoring/scoring.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
  },
  {
    path: 'stepOne', component: CreateCanvasComponent,
  },
  {
    path: 'stepTwo', component: LoopingElementComponent,
  },
  {
    path: 'stepThree', component: BouncingElementComponent,
  },
  {
    path: 'stepFour', component: PaddleElementComponent,
  },
  {
    path: 'stepFive', component: BricksComponent,
  },
  {
    path: 'stepSix', component: CollisionComponent,
  },
  {
    path: 'stepSeven', component: ScoringComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

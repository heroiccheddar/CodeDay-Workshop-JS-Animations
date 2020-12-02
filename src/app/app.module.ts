import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCanvasModule } from './components/create-canvas/create-canvas.module';
import { LoopingElementModule } from './components/looping-element/looping-element.module';
import { BouncingElementModule } from './components/bouncing-element/bouncing-element.module';
import { PaddleElementModule } from './components/paddle-element/paddle-element.module';
import { WelcomeModule } from './components/welcome/welcome.module';
import { ServicesModule } from './services/services.module';
import { DisplayCodeModule } from './components/display-code/display-code.module';
import { BricksModule } from './components/bricks/bricks.module';
import { CollisionModule } from './components/collision/collision.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BricksModule,
    BrowserAnimationsModule,
    CollisionModule,
    CreateCanvasModule,
    DisplayCodeModule,
    LoopingElementModule,
    BouncingElementModule,
    PaddleElementModule,
    ServicesModule,
    WelcomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

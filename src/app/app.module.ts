import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCanvasComponent } from './components/create-canvas/create-canvas.component';
import {CreateCanvasModule} from "./components/create-canvas/create-canvas.module";
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CreateCanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Interfaces } from './services/interface.service';
import { Classes } from './services/classes.service';
import { CharacterService } from './services/character.service';
import { RoutingService } from './services/routing.service';
import { DataService } from './services/data.service';

import { DemoComponent } from './pages/demo/demo.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';

import { AppComponent } from './app.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { GameComponent } from './components/game/game.component';
import { HeaderComponent } from './components/header/header.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { DebugComponent } from './components/debug/debug.component';
import { ControllerComponent } from './components/controller/controller.component';
import { HealthbarComponent } from './components/healthbar/healthbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguagesComponent } from './components/languages/languages.component';


@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
    GameComponent,
    HeaderComponent,
    SpriteComponent,
    DebugComponent,
    ControllerComponent,
    HealthbarComponent,
    DemoComponent,
    ResumeComponent,
    ContactComponent,
    ErrorComponent,
    FooterComponent,
    LanguagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Interfaces,
    Classes,
    CharacterService,
    RoutingService,
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

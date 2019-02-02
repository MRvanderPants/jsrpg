import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Interfaces } from './services/interface.service';
import { Classes } from './services/classes.service';
import { CharacterService } from './services/character.service';

import { AppComponent } from './app.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { GameComponent } from './components/game/game.component';
import { HeaderComponent } from './components/header/header.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { DebugComponent } from './components/debug/debug.component';
import { ControllerComponent } from './components/controller/controller.component';
import { HealthbarComponent } from './components/healthbar/healthbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
    GameComponent,
    HeaderComponent,
    SpriteComponent,
    DebugComponent,
    ControllerComponent,
    HealthbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Interfaces,
    Classes,
    CharacterService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

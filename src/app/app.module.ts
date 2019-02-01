import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Interfaces } from './services/interface.service';
import { Classes } from './services/classes.service';
import { PlayerService } from './services/player.service';
import { EnemyService } from './services/enemy.service';

import { AppComponent } from './app.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { GameComponent } from './components/game/game.component';
import { HeaderComponent } from './components/header/header.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { DebugComponent } from './components/debug/debug.component';
import { ControllerComponent } from './components/controller/controller.component';


@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
    GameComponent,
    HeaderComponent,
    SpriteComponent,
    DebugComponent,
    ControllerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Interfaces,
    Classes,
    PlayerService,
    EnemyService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

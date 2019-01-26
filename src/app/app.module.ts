import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { GameComponent } from './components/game/game.component';
import { HeaderComponent } from './components/header/header.component';
import { SpriteComponent } from './components/sprite/sprite.component';


@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
    GameComponent,
    HeaderComponent,
    SpriteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

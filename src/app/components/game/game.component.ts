import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SpriteAnimationProperties, Character } from '../../services/interface.service';
import { SpriteAnimation } from '../../classes/SpriteAnimation';
import { animations } from '../../classes/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @Input() player: Character;
  @Input() enemy: Character;
  @Output() animationEnd: EventEmitter<string>;

  public playerAnimation: SpriteAnimation;
  public enemyAnimation: SpriteAnimation;
  public turnIndex: number;
  public winner: number;

  constructor() {
    this.winner = -1;
    this.turnIndex = 0;
    this.animationEnd = new EventEmitter();
    this.playerAnimation = new SpriteAnimation(animations.player.idle);
    this.enemyAnimation = new SpriteAnimation(animations.slime.idle);
  }


  /**
   * Triggers once an sprite animation ends
   * @param { string } target player/ enemy
   */
  public animationDidEnd (target: string): void {
    this.animationEnd.emit(target);
  }


  /**
   * Plays a certain animation on a unit
   * @param { string } target
   * @param { SpriteAnimationProperties } animation
   */
  public setAnimation (target: string, animation: SpriteAnimationProperties) {
    (target === 'player')
      ? this.playerAnimation.properties.next(animation)
      : this.enemyAnimation.properties.next(animation);
  }
}

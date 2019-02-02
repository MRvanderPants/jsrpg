import { Component, OnInit, Input } from '@angular/core';
import { SpriteAnimation } from '../../services/interface.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() player;
  @Input() enemy;

  public testPlayer: SpriteAnimation;
  public testEnemy: SpriteAnimation;

  public playerHealth: number;
  public enemyHealth: Array<number>;
  public turnIndex: number;

  constructor() {

    this.testPlayer = {
      url: '/assets/player/spr_fencer_idle_strip6.png',
      width: 120,
      speed: 160,
      mirror: false
    };

    this.testEnemy = {
      url: '/assets/player/spr_fencer_idle_strip6.png',
      width: 120,
      speed: 160,
      mirror: true
    };
  }

  ngOnInit() {
    this.createGame();
  }


  /**
   * Creates a new game
   */
  private createGame (): void {

    this.turnIndex = 0;
    this.playerHealth = this.player.getStats().health;
    this.enemyHealth = this.enemy.getStats().health;

    const starter = this.findStartingPlayer();
    console.log('start', starter);
  }


  /**
   * Finds which character gets to starts the battle
   * @returns { any }
   */
  private findStartingPlayer (): any {

    const enSpeed = this.enemy.getStats().speed;
    const plSpeed = this.player.getStats().speed;

    if (enSpeed === plSpeed) { // Cointoss
      const r = Math.random();
      return (r < 0.5)
        ? this.player
        : this.enemy;
    }

    if (enSpeed > plSpeed) {
      return this.enemy;
    }

    return this.player;
  }
}

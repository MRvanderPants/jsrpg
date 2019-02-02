import { Component, OnInit, Input } from '@angular/core';
import { SpriteAnimation } from '../../services/interface.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() player;
  @Input() enemies;

  public testPlayer: SpriteAnimation;
  public testEnemy: SpriteAnimation;

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
  }

}

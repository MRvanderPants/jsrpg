import { Component, OnInit } from '@angular/core';
import { Classes } from '../../services/classes.service';
import { PlayerService } from '../../services/player.service';
import { EnemyService } from '../../services/enemy.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  public logs: any;
  public disabled: boolean;
  public player: any;
  public enemy: any;

  constructor() {
    this.logs = [];
  }

  ngOnInit() {

    window['p'] =  PlayerService.generatePlayer(this.generateStats());
    window['e'] =  EnemyService.generateEnemy(this.generateStats());
    window['d'] =  Classes.generateDebugger(this);

    window['listeners'] = [{
      id: 'attack',
      callback: (e) => { this.attack(e); }
    }, {
      id: 'defend',
      callback: (e) => { this.defend(e); }
    }];

    this.player = window['p'];
    this.enemy = window['e'];

    console.log(this.player, this.player.getStats(), this.enemy.getStats());
  }


  /**
   * Starts a new game
   */
  public startGame (): void {
    this.player.health = this.player.maxHealth;
  }


  /**
   * Pushes a log to the debugger component
   * @param { string } log
   */
  public pushLog (time: string, logs: Array<string>): void {

    this.logs.push({
      time: time,
      logs: logs.join(', ')
    });
  }


  /**
   * Clears the log list
   */
  public clearLog (): void {
    this.logs = [];
  }


  /**
   * Executes the JS code from the textarea
   * @param { string } data
   */
  public executeScript (data: string): void {

    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (player, enemy, debug) {
      var window = null, document = null;
      ${ data }
      }; new f(window.p, window.e, window.d);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
    this.disabled = true;
  }


  /**
   * Provide a stat-profile
   * @returns { any }
   */
  private generateStats (): any {

    const r = Math.random();
    if (r < 0.33) {
      return { // Average
        maxHealth: 5,
        health: 5,
        attack: 3,
        defence: 3,
        speed: 3
      };
    }
    else if (r >= 0.33 && r < 0.66) {
      return { // Defensive
        maxHealth: 5,
        health: 5,
        attack: 3,
        defence: 5,
        speed: 1
      };
    }
    else {
      return { // Offensive
        maxHealth: 5,
        health: 5,
        attack: 5,
        defence: 1,
        speed: 3
      };
    }
  }


  /**
   * Parse an attack
   * @param { any } character
   */
  private attack (character: any): void {

    const target = (character.id === 'player')
      ? this.enemy
      : this.player;

    target._resolveTurn({
      id: 'damage',
      value: character.getStats().attack
    });

    console.log('attack', character);
  }


  /**
   * Parse an attack
   * @param { any } character
   */
  private defend (character: any): void {
    console.log('defend', character);
  }
}

import { Component, OnInit } from '@angular/core';
import { Classes } from '../../services/classes.service';
import { CharacterService } from '../../services/character.service';
import { CharacterStats } from '../../services/interface.service';
import { Helper } from '../../services/helper';

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
  public debug: any;
  public largeScreen: boolean;
  public openedTab: boolean;

  private attackingCharacters: Array<any>;
  private disableFirstReset: boolean;

  constructor() {

    this.logs = [];
    this.attackingCharacters = [];
    this.largeScreen = window.innerWidth >= 640;
    this.openedTab = false;
    this.disableFirstReset = true;
  }

  ngOnInit() {
    this.startGame('', false);
  }


  /**
   * Starts a new game
   * @param { string } data
   * @param { boolean } startLoop
   */
  public startGame (data: string, startLoop: boolean): void {

    window['p'] =  CharacterService.generateCharacter('player', Helper.generateStats());
    window['e'] =  CharacterService.generateCharacter('enemy', Helper.generateStats());

    if (!window['d']) {
      window['d'] =  Classes.generateDebugger(this);
    }

    window['listeners'] = [{
      id: 'attack',
      callback: (e) => { this.attackingCharacters.push(e); } // <-- put callbacks into a list to resolve later
    }];

    this.player = window['p'];
    this.enemy = window['e'];
    this.debug = window['d'];

    // Start the game loop
    if (startLoop) {
      this.debug.clear();
      this.executeLoop(data);
    }
  }


  /**
   * Pushes a log to the debugger component
   * @param { string } time
   * @param { Array<string> } log
   */
  public pushLog (time: string, logs: Array<string>): void {

    this.logs.push({
      time: time,
      logs: logs.join(', ')
    });
    this.logs = this.logs.slice();
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
  public executeLoop (data: string): void {

    this.attackingCharacters = [];

    // Let the AI decide their turn
    this.enemy._resolveTurn({
      id: 'decide',
      value: this.player
    });

    this.executeScript(data);
    this.disabled = true;

    // Handle possible attacks this round
    this.parseAttackingCharacters(data);
  }


  /**
   * Resolve the turn
   * @param { string } data
   */
  private resolveTurn (data: string): void {

    const playerDefeated = this.player.getStats().health <= 0;
    const enemyDefeated = this.enemy.getStats().health <= 0;

    if (!playerDefeated && !enemyDefeated) {
      this.executeLoop(data);
    }
    else {
      this.debug.log('The game has ended');
      this.disabled = false;

      // Limit the health to zero is no more health
      if (playerDefeated) {
        this.debug.log('The player was defeated');
      }

      if (enemyDefeated) {
        this.debug.log('The enemy was defeated');
      }
    }
  }


  /**
   * Look for attacking characters
   * @param { string } data
   */
  private parseAttackingCharacters (data: string): void {

    if (this.attackingCharacters.length > 0) {

      // Sort the list based on character speeds
      this.attackingCharacters = this.attackingCharacters.sort((a, b) => {
        return b.getStats().speed - a.getStats().speed;
      });

      // Execute attacking moves
      const _attack = (index: number) => {

        const character = this.attackingCharacters[index];

        // Check if the player has enough health to attack
        if (character.getStats().health <= 0) {
          this.resolveTurn(data);
          return;
        }

        this.debug.log(`${ character.id } attacked!`);
        this.attack(character);
        index++;

        setTimeout(() => {

          if (index < this.attackingCharacters.length) {
            _attack(index);
          }
          else {
            this.resolveTurn(data);
          }
        }, 1000);
      };
      _attack(0);
    }

    // Decide blocking units
    if (this.attackingCharacters.indexOf(this.player) === -1) {
      this.debug.log(`player blocked!`);
    }

    if (this.attackingCharacters.indexOf(this.enemy) === -1) {
      this.debug.log(`enemy blocked!`);
    }
  }


  /**
   * Parse an attack
   * @param { any } character
   */
  private attack (character: any): void {

    setTimeout(() => {

      const target = (character.id === 'player')
        ? this.enemy
        : this.player;

      target._resolveTurn({
        id: 'damage',
        value: character.getStats().attack
      });
    }, 1000);
  }


  /**
   * Executes a user script
   */
  private executeScript (data: any): void {

    // Execute the player defined script
    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (player, enemy, debug) {
      var window = null, document = null;
      ${ data }
      }; new f(window.p, window.e.getStats(), window.d);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
  }
}

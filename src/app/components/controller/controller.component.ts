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

  private attackingCharacters: Array<any>;

  constructor() {
    this.logs = [];
    this.attackingCharacters = [];
  }

  ngOnInit() {

    window['p'] =  CharacterService.generateCharacter('player', Helper.generateStats());
    window['e'] =  CharacterService.generateCharacter('enemy', Helper.generateStats());
    window['d'] =  Classes.generateDebugger(this);

    window['listeners'] = [{
      id: 'attack',
      callback: (e) => { this.attackingCharacters.push(e); } // <-- put callbacks into a list to resolve later
    }];

    this.player = window['p'];
    this.enemy = window['e'];
    this.debug = window['d'];

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
  public executeLoop (data: string): void {

    // this.debug.clear();

    // Let the AI decide their turn
    this.enemy._resolveTurn({
      id: 'decide',
      value: this.player
    });

    // Execute the player defined script
    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (player, enemy, debug) {
      var window = null, document = null;
      ${ data }
      }; new f(window.p, window.e.getStats(), window.d);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
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
        this.debug.log(`${ character.id } attacked!`);
        this.attack(character);
        index++;

        if (index < this.attackingCharacters.length) {
          _attack(index);
        }
        else {
          this.resolveTurn(data);
        }
      };
      _attack(0);
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
}

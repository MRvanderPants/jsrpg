import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterStats, Character } from '../../services/interface.service';
import { Helper } from '../../services/helper';
import { animations } from '../../classes/animations';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @ViewChild('game') game: any;

  public disabled: boolean;
  public player: Character;
  public enemy: Character;
  public largeScreen: boolean;
  public openedTab: boolean;

  private attackingCharacters: Array<any>;
  private disableFirstReset: boolean;
  private animationCallback: any;
  private stopCycle: boolean;

  constructor() {

    this.attackingCharacters = [];
    this.largeScreen = window.innerWidth >= 640;
    this.openedTab = false;
    this.disableFirstReset = true;
    this.animationCallback = null;
    this.stopCycle = false;
  }

  ngOnInit() {
    this.startGame('');
  }


  /**
   * Starts a new game
   * @param { string } code
   * @param { boolean } startLoop
   */
  public startGame (code: string): void {

    window['p'] =  CharacterService.generateCharacter('player', Helper.generateStats(false));
    window['e'] =  CharacterService.generateCharacter('enemy', Helper.generateStats(true));

    window['listeners'] = [{
      id: 'attack',
      callback: (e) => { this.attackingCharacters.push(e); } // <-- put callbacks into a list to resolve later
    }];

    this.player = window['p'];
    this.enemy = window['e'];
    this.game.winner = -1;

    // Start the game loop
    if (code.length > 0) {
      this.executeLoop(code);
    }
  }


  /**
   * Stops the situation
   */
  public stopGame (): void {
    this.stopCycle = true;
    this.disabled = false;
  }


  /**
   * Continue's the sequence when an animation finishes playing
   * @param { string } target player / enemy
   */
  public continueFromAnimation(target: string): void {

    const animation = (target === 'player')
      ? animations.player.idle
      : animations.slime.idle;

    this.game.setAnimation(target, animation);

    if (this.animationCallback) {
      this.animationCallback();
      this.animationCallback = null;
    }
  }


  /**
   * Executes the JS code from the textarea
   * @param { string } code
   */
  public async executeLoop (code: string): Promise<void> {

    this.attackingCharacters = [];

    // Let the AI decide their turn
    await this.enemy._resolveTurn({
      id: 'decide',
      value: this.player
    });

    // Handle possible attacks this round
    this.executeScript(code);
    this.disabled = true;
    this.parseAttackingCharacters(code);
  }


  /**
   * Resolve the turn
   * @param { string } data
   */
  private resolveTurn (data: string): void {

    if (this.stopCycle) {
      this.stopCycle = false;
      return;
    }

    const playerDefeated = this.player.getStats().health <= 0;
    const enemyDefeated = this.enemy.getStats().health <= 0;

    if (!playerDefeated && !enemyDefeated) {
      this.executeLoop(data);
    }
    else {
      this.disabled = false;

      // Limit the health to zero is no more health
      if (playerDefeated) {
        this.game.winner = 1;
        console.log('The player was defeated');
      }

      if (enemyDefeated) {
        this.game.winner = 0;
        console.log('The enemy was defeated');
      }
    }
  }


  /**
   * Look for attacking characters
   * @param { string } data
   */
  private parseAttackingCharacters (code: string): void {

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
          this.resolveTurn(code);
          return;
        }

        this.attack(character).then(() => {

          index++;
          setTimeout(() => {

            if (index < this.attackingCharacters.length) {
              _attack(index);
            }
            else {
              this.resolveTurn(code);
            }
          }, 1500);
        });
      };
      _attack(0);
    }

    // Decide blocking units
    const blockingAnimation = animations.player.block;
    if (this.attackingCharacters.indexOf(this.player) === -1) {
      blockingAnimation.mirror = false;
      this.game.setAnimation('player', blockingAnimation);
    }

    if (this.attackingCharacters.indexOf(this.enemy) === -1) {
      blockingAnimation.mirror = true;
      this.game.setAnimation('enemy', blockingAnimation);
    }

    // When both units block
    if (this.attackingCharacters.indexOf(this.player) === -1
    && this.attackingCharacters.indexOf(this.enemy) === -1) {
        // this.resolveTurn(code);
    }
  }


  /**
   * Parse an attack
   * @param { any } character
   * @returns { Promise<void> }
   */
  private attack (character: any): Promise<void> {

    return new Promise ((resolve) => {

      const target = (character.id === 'player')
        ? this.enemy
        : this.player;

      const animation = (character.id === 'player')
        ? animations.player.attack
        : animations.slime.attack;

      // Set the attack animation
      this.game.setAnimation(character.id, animation);

      this.animationCallback = () => {

        target._resolveTurn({
          id: 'damage',
          value: character.getStats().attack
        }).then((response) => {

          // Display an hit animation if damaged
          if (response.type === 'damage' && response.curMove !== 'defend') {

            const other = (character.id === 'player')
              ? 'enemy'
              : 'player';

            const hitAnimation = (other === 'player')
              ? animations.player.hit
              : animations.slime.hit;

            this.game.setAnimation(other, hitAnimation);
          }
          resolve();
        });
      };
    });
  }


  /**
   * Executes a user script
   */
  private executeScript (code: string): void {

    // Execute the player defined script
    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (player, enemy) {
      var window = null, document = null;
      ${ code }
      }; new f(window.p, window.e.getStats(), window.d);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
  }
}

import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class EnemyService {

  constructor() { }


  /**
   * Generates a closed enemy class-instance
   */
  public static generateEnemy () {

    const Enemy = function () {

        const stats = {
            maxHealth: 5,
            health: 5,
            attack: 3,
            defence: 2,
            speed: 3
        };

        this.getStats = function () {
            return stats;
        };

        this.attack = function (target: any) {
            console.log('attacking');
        };

        this.defend = function (target: any) {
            console.log('defending');
        };
    };

    return new Enemy();
    }
}

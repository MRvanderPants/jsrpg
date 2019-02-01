import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class PlayerService {

  constructor() { }


  /**
   * Generates a closed player class-instance
   */
  public static generatePlayer () {

    const Player = function () {

        const stats = {
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

    return new Player();
  }
}

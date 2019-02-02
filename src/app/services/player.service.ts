import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class PlayerService {

    constructor() { }


    /**
     * Generates a closed player class-instance
     */
    public static generatePlayer (profile: any) {

        const Player = function (stats) {

            this.id = 'player';

            this.getStats = function () {
                return stats;
            };

            this.attack = function () {
                window['listeners'].filter(a => a.id === 'attack')[0].callback(this);
            };

            this.defend = function () {
                window['listeners'].filter(a => a.id === 'defend')[0].callback(this);
            };

            this._resolveTurn = function (change: any) {
                
            };
        };

        return new Player(profile);
    }
}

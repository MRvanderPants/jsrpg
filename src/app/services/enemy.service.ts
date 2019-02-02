import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class EnemyService {

  constructor() { }


    /**
     * Generates a closed enemy class-instance
     */
    public static generateCharacter (profile: any) {

        const Enemy = function (stats: any) {

            this.id = 'enemy';

            const curStats = stats;
            let curMove = '';

            this.getStats = function () {
                return curStats;
            };

            this.attack = function () {
                curMove = 'attack';
                window['listeners'].filter(a => a.id === 'attack')[0].callback(this);
            };

            this.defend = function () {
                curMove = 'defend';
                window['listeners'].filter(a => a.id === 'defend')[0].callback(this);
            };

            this._resolveTurn = function (turnData: any) {

                switch (turnData.id) {

                    case 'damage': {
                        const damage = (curMove === 'defend')
                            ? turnData.value - curStats.defence
                            : turnData.value;
                        curStats.health -= damage;
                        break;
                    }
                }
            };
        };

        return new Enemy(profile);
    }
}

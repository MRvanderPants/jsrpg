import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';
import { TurnData, CharacterStats } from './interface.service';

@Injectable()
export class CharacterService {

  constructor() { }


    /**
     * Generates a closed character class-instance
     */
    public static generateCharacter (identifier: string, profile: CharacterStats) {

        const Character = function (id: string, stats: CharacterStats) {

            this.id = id;

            const curStats = stats;
            let curMove = '';

            /**
             * Returns the complete stat object
             * @returns { CharacterStats }
             */
            this.getStats = function () {
                return curStats;
            };


            /**
             * Sets the current state to attacking
             */
            this.attack = function () {
                curMove = 'attack';
                window['listeners'].filter(a => a.id === 'attack')[0].callback(this);
            };


            /**
             * Sets the current state to defending
             */
            this.defend = function () {
                curMove = 'defend';
            };


            /**
             * Helper function to resolve turns to the player from outside this class
             * @param { TurnData } turnData
             * @returns { Promise <void> }
             */
            this._resolveTurn = function (turnData: TurnData): Promise<void> {

                return new Promise ((resolve) => {

                    switch (turnData.id) {

                        case 'damage': {

                            // Calculate the damge, or healing when blocking
                            let damage = turnData.value;
                            if (curMove === 'defend') {
                                damage -= curStats.defence;
                                curStats.health += damage;
                            }
                            else {
                                curStats.health -= damage;
                            }

                            if (curStats.health < 0) {
                                curStats.health = 0;
                            }
                            resolve();
                            break;
                        }

                        // Let the enemy AI decide what to do
                        case 'decide': {

                            const playerStats = turnData.value.getStats();

                            if (curStats.speed > playerStats.speed) { // If faster

                                const midHealth = Math.round(curStats.maxHealth / 2);
                                if (curStats.health > midHealth) { // If healthy, just attack
                                    this.attack();
                                }
                                else { // If unhealthy, 33/66 decide to attack/ block
                                    const r = Math.random();
                                    (r < 0.33)
                                        ? this.attack()
                                        : this.defend();
                                }
                            }
                            else { // If slower, be more carefull

                                if (playerStats.attack < curStats.health) { // If surviving, attack
                                    this.attack();
                                }
                                else {
                                    this.defend();
                                }
                            }
                            resolve();
                        }
                    }
                });
            };
        };

        return new Character(identifier, profile);
    }
}

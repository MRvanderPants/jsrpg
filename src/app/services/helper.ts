import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';
import { CharacterStats } from './interface.service';

@Injectable()
export class Helper {

    constructor() { }

    /**
     * Provide a stat-profile
     * @returns { CharacterStats }
     */
    public static generateStats (): CharacterStats {

        const r = Math.random();
        if (r < 0.33) {
            return { // Average
                maxHealth: 6,
                health: 6,
                attack: 3,
                defence: 1,
                speed: 2
            };
        }
        else if (r >= 0.33 && r < 0.66) {
            return { // Defensive
                maxHealth: 6,
                health: 6,
                attack: 3,
                defence: 2,
                speed: 1
            };
        }
        else {
            return { // Offensive
                maxHealth: 5,
                health: 5,
                attack: 3,
                defence: 1,
                speed: 3
            };
        }
    }
}

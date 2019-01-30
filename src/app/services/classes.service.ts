import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class Classes {

  constructor() { }


  /**
   * Generates a closed player class-instance
   */
  public static generatePlayer () {

    const Player = function () {

        const User = null;
        const stats = [5, 4, 12];

        this.getStats = function () {
            return stats;
        };
    };

    return new Player();
  }


  /**
   * Generates a closed debugger class-instance
   */
  public static generateDebugger (controller: ControllerComponent) {

    const Debug = function () {

      this['log'] = function (...messages) {
        controller.pushLog(this.time(), messages);
      };

      this['time'] = function () {

        const d = new Date();
        return [
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].map(a => (a.toString().length === 1) ? '0' + a : a).join(':');
      };

      this['clear'] = function () {
        controller.clearLog();
      };
    };

    return new Debug();
  }
}

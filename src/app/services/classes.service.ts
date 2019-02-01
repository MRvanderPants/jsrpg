import { Injectable } from '@angular/core';
import { ControllerComponent } from '../components/controller/controller.component';

@Injectable()
export class Classes {

  constructor() { }


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

      this.log('Welcome to MRvanderPants.com, '
        + 'portfolio of local game and -web  enthousiast '
        + 'of Sjoerd "MRvanderPants" van den Broek. Feel '
        + 'free to try your hand at programming an AI in '
        + 'this game I created.'
      );
    };

    return new Debug();
  }
}

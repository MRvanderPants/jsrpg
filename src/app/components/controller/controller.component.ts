import { Component, OnInit } from '@angular/core';
import { Classes } from '../../services/classes.service';
import { PlayerService } from '../../services/player.service';
import { EnemyService } from '../../services/enemy.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  public logs: any;
  public disabled: boolean;
  public player: any;
  public enemies: Array<any>;

  constructor() {
    this.logs = [];
  }

  ngOnInit() {
    window['p'] =  PlayerService.generatePlayer();
    window['e'] =  EnemyService.generateEnemy();
    window['d'] =  Classes.generateDebugger(this);

    this.player = window['p'];
    this.enemies = [window['e']];
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
  private executeScript (data: string): void {

    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (player, enemy, debug) {
      var window = null, document = null;
      ${ data }
      }; new f(window.p, window.e, window.d);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
    this.disabled = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { Classes } from '../../services/classes.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  public logs: any;

  constructor() {
    this.logs = [];
  }

  ngOnInit() {
    window['p'] =  Classes.generatePlayer();
    window['e'] =  Classes.generateEnemy();
    window['d'] =  Classes.generateDebugger(this);
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
  }
}

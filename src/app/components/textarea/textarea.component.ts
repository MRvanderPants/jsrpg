import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @ViewChild('area') area;

  public disabled: boolean;

  private areaDOM: any;

  constructor() { }

  ngOnInit() {

    this.disabled = false;

    this.areaDOM = this.area.nativeElement;
    this.areaDOM.innerHTML = `console.log('test');`;
    this.areaDOM.addEventListener('input', () => { this.submit(); }, false);

    this.fixTabs();
  }


  /**
   * Event handler for the button
   */
  public submit (): void {
    this.disabled = true;
    this.executeScript(this.areaDOM.value);
  }


  /**
   * Executes the JS code from the textarea
   * @param { string } data
   */
  private executeScript (data: string): void {

    const newScript = document.createElement('script');
    newScript.innerHTML = `
      function f (cls) {
      var window = null, document = null;
      ${ data }
      }; new f(window.user);`;
    document.body.appendChild(newScript);
    newScript.parentNode.removeChild(newScript);
  }


  /**
   * Prevents default actions so that you can tab in the textarea
   */
  private fixTabs (): void {

    const textareas = document.getElementsByTagName('textarea');
    const count = textareas.length;
    for (let i = 0; i < count; i++) {

      textareas[i].onkeydown = function(e) {
        if (e.keyCode === 9 || e.which === 9) {
          e.preventDefault();
          const s = textareas[i].selectionStart;
          textareas[i].value = textareas[i].value.substring(
            0,
            textareas[i].selectionStart
          ) + '\t' + textareas[i].value.substring(textareas[i].selectionEnd);
          textareas[i].selectionEnd = s + 1;
        }
      };
    }
  }
}

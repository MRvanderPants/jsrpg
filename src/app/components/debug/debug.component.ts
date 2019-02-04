import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  @ViewChild('wrapper') wrapper;

  @Input() logs: Array<string>;

  @Output() clear: EventEmitter<void>;

  public isSplit: boolean;

  constructor() {
    this.clear = new EventEmitter();
  }

  ngOnInit() {

    window.addEventListener('resize', () => { this.calcWidth(); }, false);

    setTimeout(() => {
      this.calcWidth();
    });
  }

  private onClear (): void {
    this.clear.emit();
  }


  /**
   * Calculates the debugger elements width
   */
  private calcWidth (): void {

    const wrapperWidth = this.wrapper.nativeElement.clientWidth;
    const elements = document.getElementsByClassName('debugger__item__message');

    for (let i = 0; i < elements.length; i++) {
      elements[i]['style'].width = (wrapperWidth * 0.70) + 'px';
    }
  }
}

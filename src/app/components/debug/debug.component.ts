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

    const wrapperWidth = this.wrapper.nativeElement.clientWidth;
    const elements = document.getElementsByClassName('debugger__item__message');

    setTimeout(() => {
      for (let i = 0; i < elements.length; i++) {
        elements[i]['style'].width = (wrapperWidth * 0.75) + 'px';
      }
    });
  }

  private onClear (): void {
    this.clear.emit();
  }
}

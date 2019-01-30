import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  @Input() logs: Array<string>;

  @Output() clear: EventEmitter<void>;

  constructor() {
    this.clear = new EventEmitter();
  }

  ngOnInit() {
    
  }

  private onClear (): void {
    this.clear.emit();
  }
}

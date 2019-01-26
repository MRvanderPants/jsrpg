import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SpriteAnimation } from '../../services/interface.service';

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements OnInit {

  @ViewChild('sprite') sprite;

  @Input() animation: SpriteAnimation;

  @Output() animationEnd: EventEmitter<SpriteAnimation>;

  public spriteWidth: number;
  public spriteIndex: number;

  private spriteDOM: any;

  constructor() {
    this.animationEnd = new EventEmitter();
  }

  ngOnInit() {

    this.spriteIndex = 0;
    this.spriteWidth = this.findSpriteCount();
    this.spriteDOM = this.sprite.nativeElement;
    this.spriteDOM.style.backgroundImage = `url('${this.animation.url}')`;

    window.setInterval(() => { this.animate(); }, this.animation.speed);
  }


  /**
   * Animation handler
   */
  private animate (): void {

    const x = this.spriteIndex * this.animation.width;
    this.spriteDOM.style.backgroundPosition = `${x}px 0`;
    this.spriteIndex++;

    if (this.spriteIndex >= this.spriteWidth) {
      this.spriteIndex = 0;
      this.animationEnd.emit(this.animation);
    }
  }


  /**
   * Animation handler
   * @returns { number }
   */
  private findSpriteCount (): number {

    const strip = this.animation.url.match(/strip[\d]/);
    const index = strip[0].match(/[\d]/)[0];
    return parseInt(index);
  }
}

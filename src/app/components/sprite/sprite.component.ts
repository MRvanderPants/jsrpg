import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SpriteAnimation } from '../../services/interface.service';

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements OnInit {

  @ViewChild('sprite') sprite;

  @Input() set animation(anim: SpriteAnimation) {
    this.curAnimation = anim;
    this.adjustAnimation = true;
  }

  @Input() controller: any;

  @Output() animationEnd: EventEmitter<SpriteAnimation>;

  public spriteWidth: number;
  public spriteIndex: number;
  public curAnimation: SpriteAnimation;

  private spriteDOM: any;
  private adjustAnimation: boolean;

  constructor() {
    this.animationEnd = new EventEmitter();
    this.adjustAnimation = false;
  }

  ngOnInit() {
    this.startAnimation();
    window.setInterval(() => { this.animate(); }, this.curAnimation.speed);
  }


  /**
   * Stats a certain animation
   */
  private startAnimation (): void {

    this.spriteIndex = 0;
    this.spriteDOM = this.sprite.nativeElement;
    this.spriteDOM.style.backgroundImage = `url('${this.curAnimation.url}')`;
    this.spriteWidth = this.findSpriteCount();
  }


  /**
   * Animation handler
   */
  private animate (): void {

    if(this.adjustAnimation) {
      this.startAnimation();
      this.adjustAnimation = false;
    }

    const x = this.spriteIndex * this.curAnimation.width;
    this.spriteDOM.style.backgroundPosition = `${x}px 0`;
    this.spriteIndex++;

    if (this.spriteIndex >= this.spriteWidth) {
      this.spriteIndex = 0;

      const exceptions = [
        '/assets/player/spr_fencer_idle_strip6.png'
      ];

      if (exceptions.indexOf(this.curAnimation.url) === -1) {
        this.animationEnd.emit(this.curAnimation);
      }
    }
  }


  /**
   * Animation handler
   * @returns { number }
   */
  private findSpriteCount (): number {

    const strip = this.curAnimation.url.match(/strip[\d]/);
    const index = strip[0].match(/[\d]/)[0];
    return parseInt(index);
  }
}

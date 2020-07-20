import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SpriteAnimation } from '../../classes/SpriteAnimation';
import { Character, SpriteAnimationProperties } from '../../services/interface.service';
import { animations } from '../../classes/animations';

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements OnInit {

  @ViewChild('sprite') sprite;

  @Input() animation: SpriteAnimation;
  @Input() controller: Character;
  @Input() isWinner = false;

  @Output() animationEnd: EventEmitter<SpriteAnimation>;

  public spriteWidth: number;
  public spriteIndex: number;
  public animationProperties: SpriteAnimationProperties;
  public mirrored: boolean;

  private spriteDOM: HTMLElement;
  private adjustAnimation: boolean;
  private init: boolean;

  constructor() {
    this.animationEnd = new EventEmitter();
    this.adjustAnimation = false;
    this.init = false;
    this.mirrored = false;
  }

  ngOnInit() {
    this.animation.properties.subscribe((properties: SpriteAnimationProperties) => {
      this.animationProperties = properties;
      this.mirrored = this.animationProperties.mirror;

      this.startAnimation();
      if (!this.init) {
        this.init = true;
        window.setInterval(() => {
          this.animate();
        }, this.animationProperties.speed);
      }
    });
  }


  /**
   * Stats a certain animation
   */
  private startAnimation (): void {
    this.spriteIndex = 0;
    this.spriteDOM = this.sprite.nativeElement;
    this.spriteDOM.style.backgroundPosition = '0px';
    this.spriteDOM.style.backgroundImage = `url('${this.animationProperties.url}')`;
    this.spriteWidth = this.findSpriteCount();
  }


  /**
   * Animation handler
   */
  private animate (): void {

    if (this.adjustAnimation) {
      this.startAnimation();
      this.adjustAnimation = false;
    }

    const x = this.spriteIndex * this.animationProperties.width;
    this.spriteDOM.style.backgroundPosition = `${x}px 0`;
    this.spriteIndex++;

    if (this.spriteIndex >= this.spriteWidth) {
      this.spriteIndex = 0;

      const exceptions = [
        animations.player.idle.url,
        animations.slime.idle.url
      ];

      if (exceptions.indexOf(this.animationProperties.url) === -1) {
        this.animationEnd.emit(this.animation);
      }
    }
  }


  /**
   * Animation handler
   * @returns { number }
   */
  private findSpriteCount (): number {
    const strip = this.animationProperties.url.match(/strip[\d]/);
    const index = strip[0].match(/[\d]/)[0];
    return parseInt(index);
  }
}

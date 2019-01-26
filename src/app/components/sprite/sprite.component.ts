import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements OnInit {

  @ViewChild('sprite') sprite;

  @Input() url: string;
  @Input() ratio: number;

  public spriteWidth: number;
  public spriteIndex: number;

  private spriteDOM: any;

  constructor() { }

  ngOnInit() {

    this.spriteIndex = 0;
    this.spriteWidth = this.findSpriteCount(this.url);
    this.spriteDOM = this.sprite.nativeElement;
    console.log('animate', this.spriteWidth);

    window.setInterval(() => { this.animate(); }, 150);
  }


  /**
   * Animation handler
   */
  private animate () {

    const x = this.spriteIndex * this.ratio;
    this.spriteDOM.style.backgroundPosition = `${x}px 0`;
    this.spriteIndex++;

    if (this.spriteIndex >= this.spriteWidth) {
      this.spriteIndex = 0;
    }
  }


  /**
   * Animation handler
   */
  private findSpriteCount (url: string): number {

    const strip = url.match(/strip[\d]/);
    const index = strip[0].match(/[\d]/)[0];
    return parseInt(index);
  }
}

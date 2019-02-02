import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-healthbar',
  templateUrl: './healthbar.component.html',
  styleUrls: ['./healthbar.component.scss']
})
export class HealthbarComponent implements OnInit {

  @ViewChild('container') container;
  @ViewChild('fill') fill;

  @Input() character: any;
  @Input() isMirrored: boolean;

  constructor() { }

  ngOnInit() {
  }


  /**
   * Calculates the health bar width
   */
  public getWidth (): number {
    const stats = this.character.getStats();
    const maxWidth = this.container.nativeElement.clientWidth;
    return (maxWidth * stats.health) / stats.maxHealth;
  }
}

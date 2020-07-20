import { Component, Input, ViewChild } from '@angular/core';
import { Character } from '../../services/interface.service';

@Component({
  selector: 'app-healthbar',
  templateUrl: './healthbar.component.html',
  styleUrls: ['./healthbar.component.scss']
})
export class HealthbarComponent {

  @ViewChild('container') container;
  @ViewChild('fill') fill;

  @Input() character: Character;
  @Input() isMirrored: boolean;

  constructor() { }


  /**
   * Calculates the health bar width
   */
  public getWidth (): number {
    const stats = this.character.getStats();
    const maxWidth = this.container.nativeElement.clientWidth;
    return (maxWidth * stats.health) / stats.maxHealth;
  }


  /**
   * Decides the colour of the healthbar
   */
  public getColour (): string {

    const stats = this.character.getStats();
    const perc = stats.health / stats.maxHealth;

    if (perc >= 0.5) {
      return 'green';
    }
    if (perc >= 0.25 && perc < 0.5) {
      return 'yellow';
    }
    return 'red';
  }
}

import { Injectable } from '@angular/core';

export interface SpriteAnimation {
  url: string;
  width: number;
  speed: number;
  mirror: boolean;
}

export interface CharacterStats {
  maxHealth: number;
  health: number;
  attack: number;
  defence: number;
  speed: number;
}

export interface TurnData {
  id: string;
  value: any;
}

@Injectable()
export class Interfaces {

  constructor() { }

}

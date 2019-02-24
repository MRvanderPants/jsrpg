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

export interface Job {
  role: string;
  skills: Array<string>;
  date_start: string;
  date_end: string;
  clients: Array<string>;
  description: string;
}

@Injectable()
export class Interfaces {

  constructor() { }

}

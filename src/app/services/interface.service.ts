import { Injectable } from '@angular/core';

export interface SpriteAnimation {
  url: string;
  width: number;
  speed: number;
  mirror: boolean;
}

@Injectable()
export class Interfaces {

  constructor() { }

}

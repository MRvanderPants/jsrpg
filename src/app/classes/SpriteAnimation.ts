import { SpriteAnimationProperties } from '../services/interface.service';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject';

export class SpriteAnimation {

  public properties: BehaviorSubject <SpriteAnimationProperties>;

  constructor (properties: SpriteAnimationProperties) {
    this.properties = new BehaviorSubject <SpriteAnimationProperties>(properties);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Route {
  id: string;
  url: string;
  current: boolean;
}

@Injectable()
export class RoutingService {

  private routes: Array<Route>;

  constructor(private router: Router) {

    this.routes = [{
      id: 'work',
      url: '',
      current: true
    }, {
      id: 'resume',
      url: '/resume',
      current: false
    }, {
      id: 'contact',
      url: '/contact',
      current: false
    }];
  }


  /**
   * Returns the current lists of routes
   * @returns { Array <Route> }
   */
  public getRoutes (): Array<Route> {
    return this.routes;
  }
}

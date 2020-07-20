import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

export interface Route {
  id: string;
  url: string;
  current: boolean;
}

@Injectable()
export class RoutingService {

  private routes: Array<Route>;

  constructor(private router: Router, @Inject(DOCUMENT)private document: Document) {

    const url = this.document.location.pathname;

    this.routes = [{
      id: 'work',
      url: '',
      current: url === '/'
    }, {
      id: 'resume',
      url: '/resume',
      current: url === '/resume'
    }, {
      id: 'contact',
      url: '/contact',
      current: url === '/contact'
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

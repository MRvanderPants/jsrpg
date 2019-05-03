import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService, Route } from '../../services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public routes: Array<Route>;
  public isOpen: boolean;

  private timeout: any;

  constructor(
    private routingSerivce: RoutingService,
    private router: Router
  ) {
    this.routes = this.routingSerivce.getRoutes();
    this.isOpen = false;
  }

  ngOnInit() { }


  /**
   * Opens a certain page
   * @param { Route } route
   */
  public activate (route: Route): void {

    this.routes.forEach((a) => {
      a.current = route === a;
    });
    this.router.navigate([route.url]);
    this.isOpen = false;
    clearTimeout(this.timeout);
  }


  /**
   * Toggles the nav state
   */
  public toggleNav () {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {

      this.timeout = setTimeout(() => {

        this.isOpen = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }, 5000);
    }
  }
}

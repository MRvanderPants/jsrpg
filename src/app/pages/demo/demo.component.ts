import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public projects = [{
    title: 'Switch',
    subtitle: 'the Gym',
    image: '../../assets/gfx/Switch1.jpg',
    languages: [
      'react',
    ],
  }, {
    title: 'Mijn van Mossel',
    image: '../../assets/gfx/VanMossel1.jpg',
    languages: [
      'angularjs',
      'typescript',
    ],
  }, {
    title: 'Planon',
    subtitle: 'CAD Viewer',
    image: '../../assets/gfx/Planon1.jpg',
    languages: [
      'angularjs',
      'typescript',
    ],
  }];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Prefixes an icon to the proper devicon icon
   * @param { string } icon
   * @returns { string }
   */
  public prefixIcon (icon: string) {
    return `devicon-${icon}-plain`;
  }
}

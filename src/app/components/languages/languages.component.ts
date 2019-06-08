import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public languages = [
    'javascript',
    'typescript',
    'angularjs',
    'vuejs',
    'react',
    'html5',
    'css3',
    'sass',
    'csharp',
    'php'
  ];

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


  /**
   * Prefixes an icon to the proper devicon icon
   * @param { number } rating
   * @returns { array }
   */
  public generateRating (rating: number) {
    return new Array(rating);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {

  public languages = [
    'javascript',
    'typescript',
    'angularjs',
    'vuejs',
    'react',
    'nodejs',
    'html5',
    'css3',
    'sass',
    'csharp',
    'php',
  ];
}

import { Component, OnInit } from '@angular/core';
import { Job } from '../../services/interface.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  public jobs: Array<Job>;

  constructor() {

    this.jobs = [{
      role: 'Javascript developer',
      skills: ['Ionic', 'Angular', 'Typescript', 'Javascript', 'Vuejs', 'Nunjucks', 'Twig', 'Testcafe'],
      date_start: '2018',
      date_end: '',
      clients: ['NoBears'],
      description: `Working as a front-end javascript developer in a web-development office creating both websites, web-apps and hybrid javascript apps for clients both small and large`
    }, {
      role: 'Front-end developer',
      skills: ['Angular', 'Typescript', 'Javascript', 'Snap.svg', 'Autodesk Forge', 'Three.js'],
      date_start: '2016',
      date_end: '2017',
      clients: ['Planon Software'],
      description: `Working as a front-end developer in various teams to build the office and facility management software called ‘Planon’. Mostly worked on a cad-viewer plugin to display and use construction drawings inside the Planon-application, and a bim-model viewer, to render 3D models in the browser.`
    }, {
      role: 'Game Design intern',
      skills: ['Javascript', 'C#'],
      date_start: '2016',
      date_end: '2017',
      clients: ['Games [4 Therapy] foundation'],
      description: `Created a playfull application in Unity (C#) for children in therapy that will replace their paper-based assignments and help them become more motivated to participate in therapy. This was a graduation internship.`
    }, {
      role: 'Designer, Developer',
      skills: ['Javascript'],
      date_start: '2014',
      date_end: '2015',
      clients: ['StoryLine'],
      description: `Created a fluid web application for sexual abuse and assault victims to help them visualize their story, rather than having them tell their story. Awarded second place at the ICTalent awards 2015.`
    }, {
      role: 'Game Design intern',
      skills: ['Javascript', 'Google Glass'],
      date_start: '2013',
      date_end: '2014',
      clients: ['Monpellier Ventures', 'REshape Center, Radboud umc Nijmegen', 'GGZe Eindhoven'],
      description: `Designed a game concept for hearth patients at the Radboud umc hospital which kept track of nation-wide AED locations. Created a HTML prototype for this game concept aswell. Secondary role as an intern was to handle and incoming requests from the medical staff and design solutions for these problems.`
    }];
  }

  ngOnInit() {
  }

}

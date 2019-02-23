import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './pages/demo/demo.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';

const appRoutes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

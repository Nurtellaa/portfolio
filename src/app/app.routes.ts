import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
//import { ProjectTemplateComponent } from './components/project-template/project-template';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  //{ path: 'project/:id', component: ProjectTemplateComponent },
  { path: '**', redirectTo: '' }
];
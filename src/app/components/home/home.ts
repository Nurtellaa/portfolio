import { Component } from '@angular/core';
import { About } from '../about/about';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Technologies } from '../technologies/technologies';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    About,
    Education,
    Experience,
    Projects,
    Technologies,
    Contact
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {}
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { PROJECTS } from '../../data/project-data';
import { Project } from '../../models/project.model';
import { ModalProjects } from '../../shared/modal-project/modal-project';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule, ModalProjects],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  projects: Project[] = PROJECTS;
  selectedProject: Project | null = null;
  isModalActive: boolean = false;

  // Open modal with the selected project
  openModal(project: Project) {
    this.selectedProject = project;
    this.isModalActive = true;
  }

  // Close modal
  closeModal() {
    this.isModalActive = false;
    this.selectedProject = null;
  }
}
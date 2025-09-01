import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education {
  isOpen: boolean[] = [false, false];

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}

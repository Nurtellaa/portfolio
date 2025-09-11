import { Component } from '@angular/core';
import { ModalContact } from "../../shared/modal-contact/modal-contact";
import { CommonModule } from '@angular/common';
import { FlipImage } from "../../shared/flip-image/flip-image";

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ModalContact, CommonModule, FlipImage],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  
  isModalActive: boolean = false;

  openModal() {
    this.isModalActive = true;
  }

  // Close modal
  closeModal() {
    this.isModalActive = false;
  }

}

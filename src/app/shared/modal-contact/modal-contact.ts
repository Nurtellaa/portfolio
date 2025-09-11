import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-modal-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-contact.html',
  styleUrl: './modal-contact.scss'
})
export class ModalContact implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;              // Cheeck if modal is active
  @Output() closeModal = new EventEmitter<void>(); // For closing modal

  currentTime: string = new Date().toLocaleString();
  statusMessage: string = '';
  isSending: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;

  // ESC to close modal
  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isActive) {
      this.onClose();
    }
  }

  ngOnInit() {
    if (this.isActive) {
      document.body.style.overflow = 'hidden'; // Avoid background scroll on section
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  // close modal
  onClose() {
    this.closeModal.emit();
    document.body.style.overflow = 'auto';
    this.statusMessage = '';
    this.isSending = false;
  }

  // Avoid modal close on click inside
  preventClose(event: Event) {
    event.stopPropagation();
  }

  sendEmail(event: Event) {
    event.preventDefault();
    console.log('📧 Sending email on prosses...');

    if (this.isSending) return;
    this.isSending = true;
    this.statusMessage = 'Sending email... ⏳';
    this.showSuccess = false;
    this.showError = false;

    const form = event.target as HTMLFormElement;
    
    // Verify form validity
    if (!form.checkValidity()) {
      console.log('❌ Form is invalid');
      form.reportValidity(); // Show validation errors
      this.isSending = false;
      return;
    }

    // Convert form to FormData JSON
    const formData = new FormData(form);
    const templateParams = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      time: formData.get('time') as string || this.currentTime
    };

    console.log('📋 Data:', templateParams);

    // Slight delay for better UX
    setTimeout(() => {
      emailjs.send(
        'service_grd50ej',
        'template_jm9osmu',
        templateParams,
        's4uLaPqU-Ydjk9Iou'
      )
      .then((result: EmailJSResponseStatus) => {
        console.log('✅ Email send succesfully:', result);
        this.statusMessage = '✅ Mensaje send succesfully';
        this.showSuccess = true;
        form.reset();
        
        // Close modal after 3 seconds if still showing success
        setTimeout(() => {
          if (this.showSuccess) {
            this.onClose();
          }
        }, 3000);
      })
      .catch((error) => {
        console.error('❌ Error sending email:', error);
        this.statusMessage = '❌ Error sending mensaje';
        this.showError = true;
        
        // show error for 5 seconds
        setTimeout(() => {
          if (this.showError) {
            this.showError = false;
            this.statusMessage = '';
          }
        }, 5000);
      })
      .finally(() => {
        this.isSending = false;
      });
    }, 300); // Small delay
  }

  //To close modal on success
  forceClose() {
    this.showSuccess = false;
    this.showError = false;
    this.statusMessage = '';
    this.onClose();
  }
}
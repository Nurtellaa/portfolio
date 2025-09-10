import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-contact',
  imports: [],
  templateUrl: './modal-contact.html',
  styleUrl: './modal-contact.scss'
})
export class ModalContact implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  // Handle escape key to close modal
  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isActive) {
      this.onClose();
    }
  }

  ngOnInit() {
    // Prevent background scrolling when modal is open
    if (this.isActive) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy() {
    // Restore scrolling when component is destroyed
    document.body.style.overflow = 'auto';
  }

  onClose() {
    this.closeModal.emit();
    document.body.style.overflow = 'auto';
  }

  // Prevent closing modal when clicking inside modal content
  preventClose(event: Event) {
    event.stopPropagation();
  }


}
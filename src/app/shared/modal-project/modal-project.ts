import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-project',
  imports: [CommonModule],
  templateUrl: './modal-project.html',
  styleUrl: './modal-project.scss'
})
export class ModalProjects implements OnInit, OnDestroy {
  @Input() project: Project | null  = null;
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

// get experience class for styling
  getExperienceClass(level: string | undefined): string {
    switch(level) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
      default: return 'beginner'; 
    }
  }
  
  // get experience text
  getExperienceText(level: string | undefined): string {
    switch(level) {
      case 'beginner': return '★★☆☆☆';
      case 'intermediate': return '★★★☆☆';
      case 'advanced': return '★★★★★';
      default: return '★★☆☆☆'; // default text
    }
  }

  onIconError(event: any, techName: string) {
    // Replace broken image with text
    event.target.style.display = 'none';
    const fallbackSpan = document.createElement('span');
    fallbackSpan.textContent = this.getTechIcon(techName);
    event.target.parentNode.appendChild(fallbackSpan);
  }
  
  // get technology icon (using emojis for simplicity)
  getTechIcon(techName: string): string {
    const iconMap: {[key: string]: string} = {
      'Angular': '⚡',
      'React': '⚛️',
      'Vue.js': '🔰',
      'JavaScript': '📜',
      'TypeScript': '🔷',
      'Node.js': '🟢',
      'Express': '🚂',
      'MongoDB': '🍃',
      'PostgreSQL': '🐘',
      'MySQL': '🐬',
      'HTML5': '🌐',
      'CSS3': '🎨',
      'Sass': '💅',
      'Git': '📚',
      'Docker': '🐳',
      'AWS': '☁️',
      'Firebase': '🔥',
      'Python': '🐍',
      'Java': '☕',
      'C#': '♟️',
      'PHP': '🐘'
    };
    
    return iconMap[techName] || '💻'; // default icon
  }
}
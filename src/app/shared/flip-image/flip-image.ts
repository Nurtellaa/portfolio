import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-flip-image',
  imports: [CommonModule],
  templateUrl: './flip-image.html',
  styleUrl: './flip-image.scss'
})
export class FlipImage {
  @Input() normalImage: string = '';
  @Input() cartoonImage: string = '';
  @Input() altText: string = 'My Photo';

  // URLs seguras para las imágenes
  safeNormalImage: SafeUrl = '';
  safeCartoonImage: SafeUrl = '';

  isFlipped: boolean = false;
  isAnimating: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Sanitizar las URLs para seguridad
    this.safeNormalImage = this.sanitizer.bypassSecurityTrustUrl(this.normalImage);
    this.safeCartoonImage = this.sanitizer.bypassSecurityTrustUrl(this.cartoonImage);
  }

  flipCoin() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.isFlipped = !this.isFlipped;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  // Manejar errores de carga de imágenes
  onImageError(event: any, imageType: string) {
    console.error(`Error loading ${imageType} image: ${event}`);
    event.target.style.display = 'none';
    
    // Mostrar un placeholder si la imagen no carga
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `<span>${imageType} image not found</span>`;
    event.target.parentNode.appendChild(placeholder);
  }
}
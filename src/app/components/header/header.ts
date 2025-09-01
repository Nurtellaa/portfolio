import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isHidden = false; // Header visibility
  lastScrollY = 0; // Last scroll position
  private scrollThreshold = 100; // Hide header after this scroll

  // States
  isDarkMode = false; // Dark mode toggle
  isMusicPlaying = false; // Music toggle

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    // Hide header when scrolling down past threshold
    if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
      this.isHidden = true;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMusic() {
    // Toggle music state
    this.isMusicPlaying = !this.isMusicPlaying;
    console.log('Music:', this.isMusicPlaying ? 'ON' : 'OFF');
  }

  toggleDarkMode() {
    // Toggle dark mode
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  scrollToContact() {
    // Scroll to contact section, navigate if not on home
    if (this.router.url === '/') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  }
}
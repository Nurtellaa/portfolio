import { Component, HostListener, OnInit, OnDestroy, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit, OnDestroy {
  isHidden = false;
  isMuted = true;
  isMusicPlaying = false;
  isDarkMode = false;

  // Scroll
  private lastScrollY = 0;
  private readonly scrollThreshold = 100;

  private subscription!: Subscription;

  // Environment
  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    private audioService: AudioService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Initialize audio state from preferences
    this.audioService.initFromPreferences();

    // Suscribe to audio state changes
    this.subscription = this.audioService.mutedState$.subscribe(muted => {
      this.isMuted = muted;
      this.isMusicPlaying = !muted;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
      this.isHidden = true;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  // -------------------- Acctions --------------------
  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMusic(): void {
    this.audioService.setMuted(!this.isMuted);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  scrollToContact(): void {
    if (!this.isBrowser) return;

    const scrollToElement = () => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (this.router.url === '/') {
      scrollToElement();
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(scrollToElement, 100);
      });
    }
  }
}

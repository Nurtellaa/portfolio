import { Component, HostListener, OnInit, OnDestroy, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit, OnDestroy {
  isHidden = false;
  lastScrollY = 0;
  private scrollThreshold = 100;

  private readonly isBrowser: boolean;
  private audio?: HTMLAudioElement;
  isMuted = true;
  isMusicPlaying = false;
  isDarkMode = false;

  // Track user interaction for autoplay
  private hasUserInteracted = false;
  private audioInitialized = false;

  constructor(
    private router: Router, 
    private audioService: AudioService, 
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Listen to audio service state changes
    this.audioService.mutedState$.subscribe(muted => {
      this.isMuted = muted;
      this.isMusicPlaying = !muted;
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Check user preference first
    const musicPreference = localStorage.getItem('musicEnabled');
    const shouldPlay = musicPreference === 'true';

    this.initializeAudio();
    
    // Set initial state based on preference
    if (shouldPlay) {
      this.audioService.setMuted(false);
    } else {
      this.audioService.setMuted(true);
    }

    // Listen for user interaction to unlock audio
    this.setupUserInteractionListener();
  }

  ngOnDestroy(): void {
    this.cleanupAudio();
  }

  private initializeAudio(): void {
    if (this.audioInitialized) return;

    this.audio = new Audio('/assets/music/music.mp3');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.5;
    this.audio.muted = true;

    // Handle audio events
    this.audio.addEventListener('play', () => {
      this.isMusicPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      this.isMusicPlaying = false;
    });

    this.audio.addEventListener('ended', () => {
      this.isMusicPlaying = false;
    });

    this.audioInitialized = true;
  }

  private setupUserInteractionListener(): void {
    const unlockAudio = () => {
      if (this.hasUserInteracted) return;
      
      this.hasUserInteracted = true;
      this.tryPlayAudio();
      
      // Remove listeners after first interaction
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
  }

  private tryPlayAudio(): void {
    if (!this.audio) return;

    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio playback started successfully');
          // Sync with audio service state
          this.audio!.muted = this.audioService.getMutedState();
          this.isMuted = this.audio!.muted;
          this.isMusicPlaying = !this.isMuted;
        })
        .catch(error => {
          console.warn('Audio playback failed:', error);
          // Retry on next user interaction if failed
          this.hasUserInteracted = false;
          this.setupUserInteractionListener();
        });
    }
  }

  private cleanupAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio = undefined;
    }
    this.audioInitialized = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
      this.isHidden = true;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMusic() {
    if (!this.audio) return;

    const newMutedState = !this.isMuted;
    
    // Update audio element
    this.audio.muted = newMutedState;
    
    // Update service and state
    this.audioService.setMuted(newMutedState);
    this.isMuted = newMutedState;
    this.isMusicPlaying = !newMutedState;

    // Save preference
    localStorage.setItem('musicEnabled', (!newMutedState).toString());

    // If unmuting and audio wasn't playing, try to play
    if (!newMutedState && this.audio.paused) {
      this.tryPlayAudio();
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  scrollToContact() {
    if (this.router.url === '/') {
      if (this.isBrowser) {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          if (this.isBrowser) {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 100);
      });
    }
  }
}
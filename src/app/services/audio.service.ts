import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio: HTMLAudioElement;
  private mutedState = new BehaviorSubject<boolean>(true);
  mutedState$ = this.mutedState.asObservable();

  constructor() {
    this.audio = new Audio('/assets/music/music.mp3');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.5;
    this.audio.muted = true;

    // sync initial state with preferences
    this.audio.addEventListener('play', () => this.mutedState.next(false));
    this.audio.addEventListener('pause', () => this.mutedState.next(true));
  }

  getMutedState(): boolean {
    return this.mutedState.value;
  }

  setMuted(muted: boolean): void {
    this.audio.muted = muted;

    if (!muted) {
      // try to play the audio, catch any errors (e.g., autoplay restrictions)
      if (this.audio.paused) {
        this.audio.play().catch(err => {
          console.warn('No se pudo iniciar la reproducción:', err);
        });
      }
    } else {
      this.audio.pause();
    }

    this.mutedState.next(muted);

    // Save preference
    localStorage.setItem('musicEnabled', (!muted).toString());
  }

  initFromPreferences(): void {
    const musicPreference = localStorage.getItem('musicEnabled');
    const shouldPlay = musicPreference === 'true';
    this.setMuted(!shouldPlay ? true : false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private muted$ = new BehaviorSubject<boolean>(true);
  private volume$ = new BehaviorSubject<number>(0.5);
  private isPlaying$ = new BehaviorSubject<boolean>(false);

  // Public observables
  public mutedState$ = this.muted$.asObservable();
  public volumeState$ = this.volume$.asObservable();
  public playingState$ = this.isPlaying$.asObservable();

  constructor() {
    // Load saved preferences from localStorage
    this.loadPreferences();
  }

  /**
   * Get current muted state
   */
  getMutedState(): boolean {
    return this.muted$.getValue();
  }

  /**
   * Get current volume level (0-1)
   */
  getVolume(): number {
    return this.volume$.getValue();
  }

  /**
   * Get current playing state
   */
  getPlayingState(): boolean {
    return this.isPlaying$.getValue();
  }

  /**
   * Set muted state
   */
  setMuted(muted: boolean): void {
    this.muted$.next(muted);
    this.savePreferences();
  }

  /**
   * Set volume level (0-1)
   */
  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.volume$.next(clampedVolume);
    this.savePreferences();
  }

  /**
   * Set playing state
   */
  setPlaying(playing: boolean): void {
    this.isPlaying$.next(playing);
  }

  /**
   * Toggle muted state
   */
  toggleMuted(): void {
    const current = this.getMutedState();
    this.setMuted(!current);
  }

  /**
   * Increase volume by 0.1
   */
  increaseVolume(): void {
    const currentVolume = this.getVolume();
    this.setVolume(currentVolume + 0.1);
  }

  /**
   * Decrease volume by 0.1
   */
  decreaseVolume(): void {
    const currentVolume = this.getVolume();
    this.setVolume(currentVolume - 0.1);
  }

  /**
   * Load preferences from localStorage
   */
  private loadPreferences(): void {
    try {
      const savedMuted = localStorage.getItem('audioMuted');
      const savedVolume = localStorage.getItem('audioVolume');

      if (savedMuted !== null) {
        this.muted$.next(savedMuted === 'true');
      }

      if (savedVolume !== null) {
        const volume = parseFloat(savedVolume);
        if (!isNaN(volume)) {
          this.volume$.next(volume);
        }
      }
    } catch (error) {
      console.warn('Failed to load audio preferences:', error);
    }
  }

  /**
   * Save preferences to localStorage
   */
  private savePreferences(): void {
    try {
      localStorage.setItem('audioMuted', this.getMutedState().toString());
      localStorage.setItem('audioVolume', this.getVolume().toString());
    } catch (error) {
      console.warn('Failed to save audio preferences:', error);
    }
  }

  /**
   * Reset to default settings
   */
  resetToDefaults(): void {
    this.setMuted(true);
    this.setVolume(0.5);
    this.setPlaying(false);
  }
}
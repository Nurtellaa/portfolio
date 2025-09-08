import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { About } from '../about/about';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';
import { Subscription } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    About,
    Education,
    Experience,
    Projects,
    Contact,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  isMusicPlaying = false;
  private audioSubscription!: Subscription;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    // Subscribe to audio service muted state
    this.audioSubscription = this.audioService.mutedState$.subscribe(
      (muted) => {
        this.isMusicPlaying = !muted;
        console.log('Music state changed:', this.isMusicPlaying ? 'Playing' : 'Paused');
      }
    );

    // Set initial state
    this.isMusicPlaying = !this.audioService.getMutedState();
  }

  ngOnDestroy(): void {
    if (this.audioSubscription) {
      this.audioSubscription.unsubscribe();
    }
  }

  toggleMusic(): void {
    const currentState = this.audioService.getMutedState();
    this.audioService.setMuted(!currentState);
  }
}
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { About } from '../about/about';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';
import { Subscription } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';
import { Gamejams } from "../gamejams/gamejams";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    About,
    Education,
    Experience,
    Projects,
    Contact,
    CommonModule,
    Gamejams
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  isMusicPlaying = false;
  private subscription!: Subscription;

  constructor(private audioService: AudioService) {}

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.2 }); // activates when 20% of the section is visible

    sections.forEach(section => observer.observe(section));
  }


  ngOnInit(): void {
    this.subscription = this.audioService.mutedState$.subscribe(muted => {
      this.isMusicPlaying = !muted;
    });

    this.isMusicPlaying = !this.audioService.getMutedState();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  toggleMusic(): void {
    this.audioService.setMuted(this.audioService.getMutedState() ? false : true);
  }
}

import { Component } from '@angular/core';
import { FlipImage } from "../../shared/flip-image/flip-image";

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [FlipImage],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gamejams',
  imports: [CommonModule],
  templateUrl: './gamejams.html',
  styleUrl: './gamejams.scss'
})
export class Gamejams {
gameJam2024 = {
    title: 'Paquito Está Perdido',
    year: 2024,
    jamSite: 'AGLLABS 2024 Global Game Jam',
    theme: 'Make Me Laugh',
    description: 'Paquito is an old legend from Cáceres, the greatest collector of walking sticks in the entire region. This elderly gentleman in his eighties can only walk with a cane, and suffers from Alzheimer\'s, dyslexia, some schizophrenia, and various other conditions.',
    story: 'Paquito has fallen into a dungeon, but luckily he is accompanied by a narrator who guides him to the exit. However, Paquito is somewhat stubborn and may not listen to the narrator, ending up getting lost.',
    tools: ['Unity'],
    platforms: ['MS Windows'],
    language: 'Spanish (Español)',
    downloadLink: 'https://globalgamejam.org/games/2024/paquito-esta-perdido-3',
    executable: 'PaquitoEstaPerdido.zip',
    installation: 'Unzip, open the "PaquitoEstaPerdido" folder and run the "Paco.exe" file',
    imageUrl: 'https://ggjv4.s3.us-west-1.amazonaws.com/files/styles/flexslider_full/s3/games/2024/793301/screenshot/PantallaInicioConTitulo.png?VersionId=FcA_Xi7nNSubsOtSyzviANCsq4SPghG1&itok=ZAS8Wk79' // Replace with actual image URL
  };
}


import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bio } from './components/bio/bio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Bio],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rodrigo-freitas-ecosystem');
}

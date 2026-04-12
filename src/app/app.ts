import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bio } from './components/bio/bio';
import { AssetCard } from './components/asset-card/asset-card';
import { MarketInsights } from "./components/market-insights/market-insights";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Bio, AssetCard, MarketInsights],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rodrigo-freitas-ecosystem');
}

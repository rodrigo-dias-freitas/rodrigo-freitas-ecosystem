import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.scss',
})
export class AssetCard {

  @Input() symbol: string = '---';
  @Input() name: string = 'Ativo';
  @Input() price: number = 0;
  @Input() change: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 0;

  // Lógica para calcular a posição da barra de progresso (Range)
  get percentage(): number {
    if (this.max === this.min) return 0;
    const pos = ((this.price - this.min) / (this.max - this.min)) * 100;
    return Math.min(Math.max(pos, 0), 100); // Trava entre 0 e 100
  }

}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetData } from '../../models/asset.model';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.scss',
})
export class AssetCard {

  @Input() asset!: AssetData;

  
  
  calculateProgress(): number {
    if (!this.asset || this.asset.high === this.asset.low) return 50;
    const progress = ((this.asset.price - this.asset.low) / (this.asset.high - this.asset.low)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

}

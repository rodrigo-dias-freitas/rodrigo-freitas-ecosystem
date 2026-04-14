import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssetData } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class Stock {

  // Este objeto simula o que você vai atualizar via formulário no futuro
  private myAssets: AssetData[] = [
    { 
      symbol: 'WINM26', 
      name: 'Mini Índice', 
      price: 1969950, 
      change_percent: -0.85, 
      low: 196451, 
      high: 197394 
    },
    { 
      symbol: 'B3SA3', 
      name: 'B3', 
      price: 19.25, 
      change_percent: 1.14, 
      low: 19.08, 
      high: 19.32 
    },
    { 
      symbol: 'BBAS3', 
      name: 'Banco do Brasil', 
      price: 24.89, 
      change_percent: 0.89, 
      low: 24.80, 
      high: 24.95 
    },
    { 
      symbol: 'BBDC4', 
      name: 'Bradesco', 
      price: 20.76, 
      change_percent: 1.51, 
      low: 20.68, 
      high: 20.80 
    },
    { 
      symbol: 'ITUB4', 
      name: 'Itau', 
      price: 46.16, 
      change_percent: 1.42, 
      low: 45.85, 
      high: 46.24 
    },
    { 
      symbol: 'PETR4', 
      name: 'Petrobras', 
      price: 49.21, 
      change_percent: -2.37, 
      low: 49.05, 
      high: 49.65 
    },
    { 
      symbol: 'VALE3', 
      name: 'Vale ON', 
      price: 87.60, 
      change_percent: 1.18, 
      low: 87.38, 
      high: 87.66 
    },
    { 
      symbol: 'DI1F28', 
      name: 'Índice DI', 
      price: 13.44, 
      change_percent: -0.48, 
      low: 13.39, 
      high: 13.45 
    },
    { 
      symbol: 'DI1F30', 
      name: 'Índice DI', 
      price: 13.25, 
      change_percent: -0.11, 
      low: 13.19, 
      high: 13.29 
    },
    { 
      symbol: 'DI1F32', 
      name: 'Índice DI', 
      price: 13.37, 
      change_percent: 0.11, 
      low: 13.31, 
      high: 13.37 
    },
  ];

  constructor() {}

  // Retorna os dados que você mesmo controla
  getMarketData(): Observable<AssetData[]> {
    return of(this.myAssets);
  }

  // Futuro método para o seu formulário de atualização
  updateAssetPrice(symbol: string, newPrice: number) {
    const asset = this.myAssets.find(a => a.symbol === symbol);
    if (asset) {
      asset.price = newPrice;
      // Aqui você dispararia o update para o seu Firebase/NodeJS/LocalStorage
    }
  }
}
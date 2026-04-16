import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bio } from './components/bio/bio';
import { AssetCard } from './components/asset-card/asset-card';
import { MarketInsights } from "./components/market-insights/market-insights";
import { MacroForecasts } from "./components/macro-forecasts/macro-forecasts";
import { CommonModule } from '@angular/common';
import { AssetData } from './models/asset.model';
import { Stock } from './services/stock';
import { Asset, AssetService } from './services/asset.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Bio, AssetCard, MarketInsights, MacroForecasts],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('rodrigo-freitas-ecosystem');

  assets: Asset[] = [];
  indices: AssetData[] = [];
  bancos: AssetData[] = [];
  acoes: AssetData[] = [];
  tendenciaGeral: string = '';
  banking: Asset[] = [];
  commodities: Asset[] = [];

  constructor(private stockService: Stock, private assetService: AssetService) {}

  ngOnInit(){

    this.loadAssets();

    this.assetService.getAssets().subscribe({
      next: (data) => {
        this.assets = data;
        console.log('Assets:', data);
      },
      error: (err) => {
        console.error('Erro ao buscar assets', err);
      }
    });

    this.stockService.getMarketData().subscribe(data => {
      // Filtramos por categorias (ajuste os símbolos conforme sua lista)
      this.indices = data.filter(a => ['DI1F28', 'DI1F30', 'DI1F32'].includes(a.symbol));
      
      this.calcularTendenciaSFLIM();
    });
  }

  calcularTendenciaSFLIM() {
    // Mapeamos os estados (true = positivo/alta do juros, false = negativo/queda do juros)
    // O '?? 0' garante que, se não encontrar o DI, ele assuma 0 (neutro) e não quebre o código
    const di28 = (this.indices.find(i => i.symbol === 'DI1F28')?.change_percent ?? 0) >= 0;
    const di30 = (this.indices.find(i => i.symbol === 'DI1F30')?.change_percent ?? 0) >= 0;
    const di32 = (this.indices.find(i => i.symbol === 'DI1F32')?.change_percent ?? 0) >= 0;

    const bancosTodosPositivos = this.bancos.every(b => b.change_percent > 0);
    const bancosTodosNegativos = this.bancos.every(b => b.change_percent < 0);

    let sinalJuros:string = '';

    // Regras de Ouro SFLIM baseadas nos DIs
    if (di28 && di30 && di32) sinalJuros = 'BAIXA FORTE';
    else if (!di28 && !di30 && !di32) sinalJuros = 'ALTA FORTE';
    
    // 2 próximos positivos, distante negativo
    else if (di28 && di30 && !di32) sinalJuros = 'VENDA FRACA';
    
    // 2 próximos negativos, distante positivo
    else if (!di28 && !di30 && di32) sinalJuros = 'COMPRA FRACA';
    
    // Próximo negativo, os 2 restantes positivos
    else if (!di28 && di30 && di32) sinalJuros = 'VENDA';
    
    // Próximo positivo, os 2 restantes negativos
    else if (di28 && !di30 && !di32) sinalJuros = 'COMPRA';

    // Validação Final com os Bancos
    if ((sinalJuros.includes('COMPRA') || sinalJuros === 'ALTA FORTE') && bancosTodosPositivos) {
      this.tendenciaGeral = sinalJuros;
    } 
    else if ((sinalJuros.includes('VENDA') || sinalJuros === 'BAIXA FORTE') && bancosTodosNegativos) {
      this.tendenciaGeral = sinalJuros;
    } 
    else {
      this.tendenciaGeral = 'NEUTRA'; // Bancos não confirmaram o lado do DI
    }
  }

  loadAssets() {
    this.assetService.getAssets().subscribe(data => {

      this.banking = data.filter(a =>
        ['ITUB4','BBDC4','BBAS3','B3SA3'].includes(a.symbol)
      );

      this.commodities = data.filter(a =>
        ['PETR4','VALE3'].includes(a.symbol)
      );

    });
  }
}

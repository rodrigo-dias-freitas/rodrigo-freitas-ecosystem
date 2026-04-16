import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private API = 'http://localhost:3000/api/assets';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.API);
  }
}
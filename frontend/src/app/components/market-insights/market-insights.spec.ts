import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInsights } from './market-insights';

describe('MarketInsights', () => {
  let component: MarketInsights;
  let fixture: ComponentFixture<MarketInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

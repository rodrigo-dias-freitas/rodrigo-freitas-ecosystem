import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroForecasts } from './macro-forecasts';

describe('MacroForecasts', () => {
  let component: MacroForecasts;
  let fixture: ComponentFixture<MacroForecasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroForecasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacroForecasts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TweedleChartComponent } from './tweedle-chart.component';

describe('TweedleChartComponent', () => {
  let component: TweedleChartComponent;
  let fixture: ComponentFixture<TweedleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweedleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweedleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

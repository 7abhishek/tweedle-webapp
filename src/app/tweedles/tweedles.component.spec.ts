/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TweedlesComponent } from './tweedles.component';

describe('TweedlesComponent', () => {
  let component: TweedlesComponent;
  let fixture: ComponentFixture<TweedlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweedlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweedlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

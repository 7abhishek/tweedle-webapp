/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TweedleService } from './tweedle.service';

describe('TweedleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweedleService]
    });
  });

  it('should ...', inject([TweedleService], (service: TweedleService) => {
    expect(service).toBeTruthy();
  }));
});

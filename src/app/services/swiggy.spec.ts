import { TestBed } from '@angular/core/testing';

import { Swiggy } from './swiggy';

describe('Swiggy', () => {
  let service: Swiggy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Swiggy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

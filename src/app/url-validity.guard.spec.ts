import { TestBed } from '@angular/core/testing';

import { UrlValidityGuard } from './url-validity.guard';

describe('UrlValidityGuard', () => {
  let guard: UrlValidityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UrlValidityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

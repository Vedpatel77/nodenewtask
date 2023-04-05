import { TestBed } from '@angular/core/testing';

import { ChildpathGuard } from './childpath.guard';

describe('ChildpathGuard', () => {
  let guard: ChildpathGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChildpathGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MemoPadService } from './memo-pad.service';

describe('MemoPadService', () => {
  let service: MemoPadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoPadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

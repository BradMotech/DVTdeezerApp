import { TestBed } from '@angular/core/testing';

import { DeezerCallsService } from './deezer-calls.service';

describe('DeezerCallsService', () => {
  let service: DeezerCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeezerCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

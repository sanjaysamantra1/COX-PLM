import { TestBed, inject } from '@angular/core/testing';

import { RequestorDataService } from './requestor-data.service';

describe('RequestorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestorDataService]
    });
  });

  it('should be created', inject([RequestorDataService], (service: RequestorDataService) => {
    expect(service).toBeTruthy();
  }));
});

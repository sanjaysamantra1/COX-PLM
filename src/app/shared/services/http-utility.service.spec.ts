import { TestBed, inject } from '@angular/core/testing';

import { HttpUtilityService } from './http-utility.service';

describe('HttpUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpUtilityService]
    });
  });

  it('should be created', inject([HttpUtilityService], (service: HttpUtilityService) => {
    expect(service).toBeTruthy();
  }));
});

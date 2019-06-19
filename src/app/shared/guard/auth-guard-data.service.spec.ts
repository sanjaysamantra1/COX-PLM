import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardDataService } from './auth-guard-data.service';

describe('AuthGuardDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardDataService]
    });
  });

  it('should be created', inject([AuthGuardDataService], (service: AuthGuardDataService) => {
    expect(service).toBeTruthy();
  }));
});

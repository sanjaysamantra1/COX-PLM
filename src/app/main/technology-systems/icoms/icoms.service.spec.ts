import { TestBed, inject } from '@angular/core/testing';

import { IcomsService } from './icoms.service';

describe('IcomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcomsService]
    });
  });

  it('should be created', inject([IcomsService], (service: IcomsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { DiscountCodesListService } from './discount-codes-list.service';

describe('DiscountCodesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountCodesListService]
    });
  });

  it('should be created', inject([DiscountCodesListService], (service: DiscountCodesListService) => {
    expect(service).toBeTruthy();
  }));
});

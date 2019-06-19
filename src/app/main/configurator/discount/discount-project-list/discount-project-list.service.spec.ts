import { TestBed, inject } from '@angular/core/testing';

import { DiscountProjectListService } from './discount-project-list.service';

describe('DiscountProjectListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountProjectListService]
    });
  });

  it('should be created', inject([DiscountProjectListService], (service: DiscountProjectListService) => {
    expect(service).toBeTruthy();
  }));
});

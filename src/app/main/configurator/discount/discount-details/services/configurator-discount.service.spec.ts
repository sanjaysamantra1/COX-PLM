import { TestBed, inject } from '@angular/core/testing';

import { ConfiguratorDiscountService } from './configurator-discount.service';

describe('ConfiguratorDiscountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorDiscountService]
    });
  });

  it('should be created', inject([ConfiguratorDiscountService], (service: ConfiguratorDiscountService) => {
    expect(service).toBeTruthy();
  }));
});

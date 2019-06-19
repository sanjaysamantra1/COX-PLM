import { TestBed, inject } from '@angular/core/testing';

import { ConfiguratorDiscountDataService } from './configurator-discount-data.service';

describe('ConfiguratorDiscountDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorDiscountDataService]
    });
  });

  it('should be created', inject([ConfiguratorDiscountDataService], (service: ConfiguratorDiscountDataService) => {
    expect(service).toBeTruthy();
  }));
});

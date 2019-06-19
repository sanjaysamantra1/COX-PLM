import { TestBed, inject } from '@angular/core/testing';

import { ConfiguratorDataService } from './configurator-data.service';

describe('ConfiguratorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorDataService]
    });
  });

  it('should be created', inject([ConfiguratorDataService], (service: ConfiguratorDataService) => {
    expect(service).toBeTruthy();
  }));
});

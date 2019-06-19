import { TestBed, inject } from '@angular/core/testing';

import { ConfiguratorProjectListService } from './configurator-project-list.service';

describe('ConfiguratorProjectListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorProjectListService]
    });
  });

  it('should be created', inject([ConfiguratorProjectListService], (service: ConfiguratorProjectListService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { SearchUserService } from './search-user.service';

describe('SearchUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchUserService]
    });
  });

  it('should be created', inject([SearchUserService], (service: SearchUserService) => {
    expect(service).toBeTruthy();
  }));
});

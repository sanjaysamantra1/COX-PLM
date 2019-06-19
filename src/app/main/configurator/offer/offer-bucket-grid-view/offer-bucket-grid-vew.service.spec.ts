import { TestBed, inject } from '@angular/core/testing';

import { OfferBucketGridVewService } from './offer-bucket-grid-vew.service';

describe('OfferBucketGridVewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferBucketGridVewService]
    });
  });

  it('should be created', inject([OfferBucketGridVewService], (service: OfferBucketGridVewService) => {
    expect(service).toBeTruthy();
  }));
});

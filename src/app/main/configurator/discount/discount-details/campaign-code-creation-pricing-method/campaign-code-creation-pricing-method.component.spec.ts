import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCodeCreationPricingMethodComponent } from './campaign-code-creation-pricing-method.component';

describe('CampaignCodeCreationPricingMethodComponent', () => {
  let component: CampaignCodeCreationPricingMethodComponent;
  let fixture: ComponentFixture<CampaignCodeCreationPricingMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCodeCreationPricingMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCodeCreationPricingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

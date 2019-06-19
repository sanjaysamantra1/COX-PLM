import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountPricingRulesComponent } from './discount-pricing-rules.component';

describe('DiscountPricingRulesComponent', () => {
  let component: DiscountPricingRulesComponent;
  let fixture: ComponentFixture<DiscountPricingRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountPricingRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountPricingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

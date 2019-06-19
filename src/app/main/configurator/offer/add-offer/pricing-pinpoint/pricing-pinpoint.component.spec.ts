import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPinpointComponent } from './pricing-pinpoint.component';

describe('PricingPinpointComponent', () => {
  let component: PricingPinpointComponent;
  let fixture: ComponentFixture<PricingPinpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPinpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPinpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

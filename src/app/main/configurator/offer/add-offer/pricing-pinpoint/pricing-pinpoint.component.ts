import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { OfferFormDropDown, OfferPinpointTxnDets } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-pricing-pinpoint',
  templateUrl: './pricing-pinpoint.component.html'
})
export class PricingPinpointComponent implements OnInit, OnChanges {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerPricingPinPointInfo: OfferPinpointTxnDets;
  constructor(private configuratorDataService: ConfiguratorDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.offerFormDropDown = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : [];
      } else if (propName === 'offerPricingPinPointInfo') {
          this.offerPricingPinPointInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      }
    }
  }

  updateSubmitData(field, value) {
      this.configuratorDataService.configuratorOfferModel.offerModel.offerPinpointTxnDet[field] = value;
  }

}

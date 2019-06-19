import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { OfferFormDropDown, OffrEcommPinpntTxnDets } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-ecomm-pinpoint',
  templateUrl: './ecomm-pinpoint.component.html'
})
export class EcommPinpointComponent implements OnInit, OnChanges  {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerECOMMPinPointInfo: OffrEcommPinpntTxnDets;

  constructor(private configuratorDataService: ConfiguratorDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.offerFormDropDown = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : [];
      } else if (propName === 'offerECOMMPinPointInfo') {
          this.offerECOMMPinPointInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      }
    }
  }

  updateSubmitData(field, value) {
    this.configuratorDataService.configuratorOfferModel.offerModel.offrEcommPinpntTxnDet[field] = value;
  }

}

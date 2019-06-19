import { Component, OnInit, Input } from '@angular/core';
import { OfferFormDropDown } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';

@Component({
  selector: 'plm-elgibility-rules',
  templateUrl: './elgibility-rules.component.html'
})
export class ElgibilityRulesComponent implements OnInit {

  @Input() offerFormDropDown: OfferFormDropDown;
  private showAddElRulesError: Boolean;
  constructor() { 
    this.showAddElRulesError = false;
  }

  ngOnInit() {
  }

}

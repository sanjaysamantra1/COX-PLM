import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { OfferFormDropDown, OfferDiscMapTxnDets, Discounts } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-discount-association',
  templateUrl: './discount-association.component.html'
})
export class DiscountAssociationComponent implements OnInit {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerDiscountAssInfo: OfferDiscMapTxnDets[];

  private selectedDiscount: Discounts;
  private discountList: string[];
  private discountAssociate: Discounts[];
  private currentDiscount: string;
  private myControl: FormControl;
  private filteredOptions2: Observable<string[]>;
  private discounts: Discounts[];
  private isDiscountExists: Boolean;
  private discountPrimary: Boolean[];

  constructor(private configuratorDataService: ConfiguratorDataService) {
    this.discountList = [];
    this.discountAssociate = [];
    this.currentDiscount = '';
    this.myControl = new FormControl();
    this.isDiscountExists = false;
    this.discountPrimary = [];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.discounts = ((typeof change.currentValue != 'undefined') && (typeof change.currentValue.DISCOUNTS != 'undefined')) ? (JSON.parse(JSON.stringify(change.currentValue.DISCOUNTS))) : [];
          this.updateDiscountList(this.discounts);
          this.filteredOptions2 = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(val => this.filter2(val))
            );
      } else if (propName === 'offerDiscountAssInfo') {
          this.offerDiscountAssInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
          for (let i=0; i<this.offerDiscountAssInfo.length; i++) {
            this.onSelectDiscount(this.offerDiscountAssInfo[i].discountName);
            this.discountPrimary[i] = (this.offerDiscountAssInfo[i].primaryFlag == 'Y') ? true : false;
          }
      }
    }
  }

  filter2(value: string): string[] {
    return this.discountList.filter(option1 =>
      option1.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  updateDiscountList(offerDiscounts){
    for(let i=0; i<offerDiscounts.length; i++) {
      this.discountList.push(offerDiscounts[i].discountCode);
    }
  }

  onSelectDiscount(discount){
    let selecteddiscount: any;
    if (this.discountAlreadyAdded(discount)) {
      this.isDiscountExists = true;
      return false;
    }
    for(let i=0; i<this.discounts.length; i++) {
      if (discount === this.discounts[i].discountCode) {
        selecteddiscount = this.discounts[i];
        break;
      }
    }
    if (typeof selecteddiscount !== 'undefined') {
      this.selectedDiscount = selecteddiscount; 
      this.discountAssociate.push(this.selectedDiscount);
    }
    this.updateSubmitData();
  }

  discountAlreadyAdded(discount) {
    let result = false;
    for(let i=0; i<this.discountAssociate.length; i++) {
      if (discount === this.discountAssociate[i].discountCode) {
        result = true;
        break;
      }
    }
    return result;
  }

  /** Display function for selected autocomplete values. */
  displayNull(value) {
    return null;
  }

  removeDiscount(index){
    this.discountAssociate.splice(index, 1);
    this.updateSubmitData();
  }

  updateSubmitData() {
    this.configuratorDataService.configuratorOfferModel.offerModel.offerDiscMapTxnDets = [];
    for (let i=0; i < this.discountAssociate.length; i++) {
      this.configuratorDataService.configuratorOfferModel.offerModel.offerDiscMapTxnDets.push({
        'discountId': this.discountAssociate[i].discountId,
				'offrDiscountMapId': null,
				'discountName': this.discountAssociate[i].discountId,
				'discountType': '',
				'primaryFlag': (this.discountPrimary[i]) ? 'Y' : 'N'
      });
    }
  }

}

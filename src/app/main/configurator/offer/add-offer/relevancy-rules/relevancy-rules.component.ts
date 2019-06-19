import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { OfferFormDropDown, OfferRelRuleTxnDets, RelevancyRules } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-relevancy-rules',
  templateUrl: './relevancy-rules.component.html'
})
export class RelevancyRulesComponent implements OnInit {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerRelevancyRulesInfo: OfferRelRuleTxnDets[];

  private selectedRelevancyRules: RelevancyRules;
  private relevancyRulesList: string[];
  private relevancyRulesAssociate: RelevancyRules[];
  private currentRelevancyRules: string;
  private myControl: FormControl;
  private filteredOptions2: Observable<string[]>;
  private isRelevancyRulesExists: Boolean;
  private relevancyRules: RelevancyRules[];

  constructor(private configuratorDataService: ConfiguratorDataService) {
    this.relevancyRulesList = [];
    this.relevancyRulesAssociate = [];
    this.currentRelevancyRules = '';
    this.myControl = new FormControl();
    this.isRelevancyRulesExists = false;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.relevancyRules = ((typeof change.currentValue != 'undefined') && (typeof change.currentValue['RELEVANCY_RULES'] != 'undefined')) ? (JSON.parse(JSON.stringify(change.currentValue['RELEVANCY_RULES']))) : [];
          this.updateRelevancyRulesList(this.relevancyRules);
          this.filteredOptions2 = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(val => this.filter2(val))
            );
      } else if (propName === 'offerRelevancyRulesInfo') {
          this.offerRelevancyRulesInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
          for (let i=0; i<this.offerRelevancyRulesInfo.length; i++) {
            this.onSelectRelevancyRules(this.offerRelevancyRulesInfo[i].ruleName);
          }
      }
    }
  }

  filter2(value: string): string[] {
    return this.relevancyRulesList.filter(option1 =>
      option1.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  updateRelevancyRulesList(offerRelevancyRules){
    for(let i=0; i<offerRelevancyRules.length; i++) {
      this.relevancyRulesList.push(offerRelevancyRules[i].rule);
    }
  }


  /** Display function for selected autocomplete values. */
  displayNull(value) {
    return null;
  }

  removeRelevancyRules(index){
    this.relevancyRulesAssociate.splice(index, 1);
    this.updateSubmitData();
  }

  onSelectRelevancyRules(relevancyRules){
    let selectedRelevancyRules: any;
    if (this.relevancyRulesAlreadyAdded(relevancyRules)) {
      this.isRelevancyRulesExists = true;
      return false;
    }
    for(let i=0; i<this.relevancyRules.length; i++) {
      if (relevancyRules === this.relevancyRules[i].rule) {
        selectedRelevancyRules = this.relevancyRules[i];
        break;
      }
    }
    if (typeof selectedRelevancyRules !== 'undefined') {
      this.selectedRelevancyRules = selectedRelevancyRules; 
      this.relevancyRulesAssociate.push(this.selectedRelevancyRules);
    }
    this.updateSubmitData();
  }

  relevancyRulesAlreadyAdded(relevancyRules) {
    let result = false;
    for(let i=0; i<this.relevancyRulesAssociate.length; i++) {
        if (relevancyRules === this.relevancyRulesAssociate[i].rule) {
          result = true;
          break;
        }
    }
    return result;
  }

  updateSubmitData() {
    this.configuratorDataService.configuratorOfferModel.offerModel.offerRelRuleTxnDets = [];
    for (let i=0; i < this.relevancyRulesAssociate.length; i++) {
      this.configuratorDataService.configuratorOfferModel.offerModel.offerRelRuleTxnDets.push({
        'id': this.relevancyRulesAssociate[i].relId,
				'offrRelRruleMapId': null,
				'ruleName': this.relevancyRulesAssociate[i].rule,
				'createdDate': '',
				'modifiedDate': '',
				'modifiedOwner': ''
      });
    }
  }

}

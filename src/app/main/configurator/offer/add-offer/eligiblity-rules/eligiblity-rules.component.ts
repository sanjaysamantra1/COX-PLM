import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { OfferFormDropDown, OfferRelRuleTxnDets, EligiblityRules } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-eligiblity-rules',
  templateUrl: './eligiblity-rules.component.html'
})
export class EligiblityRulesComponent implements OnInit {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerEligiblityRulesInfo: OfferRelRuleTxnDets[];

  private selectedEligiblityRules: EligiblityRules;
  private eligiblityRulesList: string[];
  private eligiblityRulesAssociate: EligiblityRules[];
  private currentEligiblityRules: string;
  private myControl: FormControl;
  private filteredOptions2: Observable<string[]>;
  private isEligiblityRulesExists: Boolean;
  private eligiblityRules: EligiblityRules[];
  private eligiblityRulesPrimary: Boolean[];
  private eligiblityRulesSecondary: Boolean[];

  constructor(private configuratorDataService: ConfiguratorDataService) {
    this.eligiblityRulesList = [];
    this.eligiblityRulesAssociate = [];
    this.currentEligiblityRules = '';
    this.myControl = new FormControl();
    this.isEligiblityRulesExists = false;
    this.eligiblityRulesPrimary = [];
    this.eligiblityRulesSecondary = [];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.eligiblityRules = ((typeof change.currentValue != 'undefined') && (typeof change.currentValue['ELIGIBILITY_RULES'] != 'undefined')) ? (JSON.parse(JSON.stringify(change.currentValue['ELIGIBILITY_RULES']))) : [];
          this.updateEligiblityRulesList(this.eligiblityRules);
          this.filteredOptions2 = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(val => this.filter2(val))
            );
      } else if (propName === 'offerEligiblityRulesInfo') {
          this.offerEligiblityRulesInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
          for (let i=0; i<this.offerEligiblityRulesInfo.length; i++) {
            this.onSelectEligiblityRules(this.offerEligiblityRulesInfo[i].ruleName);
            this.eligiblityRulesPrimary[i] = false;
            this.eligiblityRulesSecondary[i] = false;
          }
      }
    }
  }

  filter2(value: string): string[] {
    return this.eligiblityRulesList.filter(option1 =>
      option1.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  updateEligiblityRulesList(offerEligiblityRules){
    for(let i=0; i<offerEligiblityRules.length; i++) {
      this.eligiblityRulesList.push(offerEligiblityRules[i].rule);
    }
  }


  /** Display function for selected autocomplete values. */
  displayNull(value) {
    return null;
  }

  removeEligiblityRules(index){
    this.eligiblityRulesAssociate.splice(index, 1);
    this.updateSubmitData();
  }

  onSelectEligiblityRules(eligiblityRules){
    let selectedEligiblityRules: any;
    if (this.eligiblityRulesAlreadyAdded(eligiblityRules)) {
      this.isEligiblityRulesExists = true;
      return false;
    }
    for(let i=0; i<this.eligiblityRules.length; i++) {
      if (eligiblityRules === this.eligiblityRules[i].rule) {
        selectedEligiblityRules = this.eligiblityRules[i];
        break;
      }
    }
    if (typeof selectedEligiblityRules !== 'undefined') {
      this.selectedEligiblityRules = selectedEligiblityRules; 
      this.eligiblityRulesAssociate.push(this.selectedEligiblityRules);
    }
    this.updateSubmitData();
  }

  eligiblityRulesAlreadyAdded(eligiblityRules) {
    let result = false;
    for(let i=0; i<this.eligiblityRulesAssociate.length; i++) {
        if (eligiblityRules === this.eligiblityRulesAssociate[i].rule) {
          result = true;
          break;
        }
    }
    return result;
  }

  updateSubmitData() {
    this.configuratorDataService.configuratorOfferModel.offerModel.offerEligRuleTxnDets = [];
    for (let i=0; i < this.eligiblityRulesAssociate.length; i++) {
      this.configuratorDataService.configuratorOfferModel.offerModel.offerEligRuleTxnDets.push({
        'id': this.eligiblityRulesAssociate[i].eligiId,
				'offrRelEruleMapId': null,
				'ruleName': this.eligiblityRulesAssociate[i].rule,
				'createdDate': '',
				'modifiedDate': '',
				'modifiedOwner': ''
      });
    }
  }

}

import { Component, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { DiscountService } from '../discount.service';

@Component({
  selector: 'plm-discount-pricing-rules',
  templateUrl: './discount-pricing-rules.component.html',
  styleUrls: ['./discount-pricing-rules.component.css'],
  providers: [UtilitiesService]
})
export class DiscountPricingRulesComponent implements OnInit, OnChanges {

  // @Input() masterData: any;
  // @Input() addEditDiscountSubmitData: any;
  // @Input() pricingRules: any;

  private masterData: any;
  private addEditDiscountSubmitData: any;
  private pricingRules: any;

  private noSitesExist: boolean;
  private noPercentOfNormalRate: boolean;
  private noAmountExist: boolean;
  private noPricingMethod: boolean;
  private showPricingRules: boolean;
  private singleSelectSettings = {};
  private multiSelectSettings = {};
  private marketsSelected: any[];
  private descriptionBuilderAmount: string;
  private pricingMethod: number;
  private addEditMode: Boolean;
  private viewMode: Boolean;
  private pricingRulesList: any[];
  private pricingCategoryDropDownList = [];
  private pricingCategorySelectedItems = [];
  private statementPresentationCodeDropDownList = [];
  private statementPresentationCodeSelectedItems = [];
  private priceBookICOMSCodeDropDownList = [];
  private priceBookICOMSCodeSelectedItems = [];
  private totalAmntToFirstBundleDiscount: number;
  private totalFixedPricing: number;
  private totalAmnToMinReqPricingCategory: number;
  private totalDiscountDollarOff: number;
  private totalSiteAmount: any;

  constructor(
    private discountService: DiscountService, 
    private configuratorDiscountDataService: ConfiguratorDiscountDataService,
    private utilitiesService: UtilitiesService
  ) {
    this.noSitesExist = true;
    this.noPercentOfNormalRate = true;
    this.noPricingMethod = true;
    this.noAmountExist = true;
    this.showPricingRules = false;
    this.addEditMode = false;
    this.viewMode = false;
    this.marketsSelected = [];
    this.descriptionBuilderAmount = '0';
    this.pricingMethod = 0;
    this.pricingRulesList = [];
    this.totalAmntToFirstBundleDiscount = 0;
    this.totalFixedPricing = 0;
    this.totalAmnToMinReqPricingCategory = 0;
    this.totalDiscountDollarOff = 0;
    this.totalSiteAmount = {};
    this.masterData = this.configuratorDiscountDataService.discountMasterData;
    this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
    this.getPriceBookData();
    this.executeEditViewPhase();
  }

  ngOnInit() {
    this.singleSelectSettings = {
      singleSelection: true,
      text: 'Select One',
      enableSearchFilter: true,
      maxHeight: 120
    };
    this.multiSelectSettings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      badgeShowLimit: 3,
      maxHeight: 120
    };
    this.configuratorDiscountDataService.descriptionBuilderAmount.subscribe(
      text => {
        this.descriptionBuilderAmount = text;
        this.resetPricingRulesList();
        this.executeDescriptionBuilderAmount(text);
      }
    );
    this.configuratorDiscountDataService.marketList.subscribe(
      sites => {
        this.marketsSelected = this.getMarketListObj(sites);
        this.resetPricingRulesList();
        this.executeMarketList(sites);
      }
    );
    this.configuratorDiscountDataService.pricingMethod.subscribe(
      pricingMethodVal => {
        this.pricingMethod = pricingMethodVal;
        this.resetPricingRulesList();
        this.executePricingMethodSubscribeUpdate(pricingMethodVal);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getPriceBookData() {
    this.discountService.getPriceBookData()
      .subscribe(
      data => {
        this.pricingRules = data.priceBook;
        this.configuratorDiscountDataService.pricingRules = data.priceBook;
        this.updateDropDownList();
        this.updatePageVariables();
        this.initializePricingRulesList();
        for (let i=0; i<this.pricingRulesList.length; i++) {
          this.pricingRulesList[i].pricingMethod = this.pricingMethod;
        }
      },
      error => {
        console.log('Error :: ' + error)
      }
    );
  }

  resetPricingRulesList() {
    console.log('Comes in Reset');
    this.pricingRulesList = [];
    this.addEditDiscountSubmitData.pricingRules = this.getInitialPricingRule();
    this.initializePricingRulesList();
  }

  getInitialPricingRule() {
    return [{
      'codepricingRulesId': null,
      'absorb': 'No',
      'activeService': 'No',
      'amtFrstBundleDiscount': 0,
      'amtMinReqPricingCatg': 0,
      'bundleDiscount': false,
      'campaignDollarOff': 0,
      'fixedPricing': 0,
      'minRequirmnt': false,
      'numOccurnceDiscount': 0,
      'numOfMnths': 0,
      'other': '',
      'pricebookChrgIcomscodeDesc': '',
      'pricebookChrgReltdIcomscode': '',
      'pricebookEndDate': '',
      'pricebookStartDate': '',
      'presentationCodeId': '',
      'pricingCategoryName': '',
      'pricingRuleSites': []
    }]
  }

  executePricingMethodSubscribeUpdate(pricingMethodVal) {
    this.updatePageVariables();
  }

  executeMarketList(sites){
    for (let i=0; i<this.pricingRulesList.length; i++) {
      this.pricingRulesList[i].markets = this.marketsSelected;
      this.pricingRulesList[i].pricingRuleSites = this.getPricingRuleSites(this.addEditDiscountSubmitData.pricingRules[i].pricingRuleSites);
    }
    this.updatePageVariables();
  }

  executeDescriptionBuilderAmount(text) {
    for (let i=0; i<this.pricingRulesList.length; i++) {
      this.pricingRulesList[i].descriptionBuilderAmount = text;
    }
    this.updatePageVariables();
  }

  updatePageVariables(){
    this.noSitesExist = (this.marketsSelected.length == 0) ? true : false;
    this.noPricingMethod = (this.pricingMethod == 0) ? true : false;
    // this.noPercentOfNormalRate = ((this.getPricingMethod(this.pricingMethod) == 'D') && ((Number(this.configuratorDiscountDataService.payPercentToNormalRate) == 0) || (typeof this.configuratorDiscountDataService.payPercentToNormalRate == 'undefined'))) ? true : false;
    this.noAmountExist = (this.descriptionBuilderAmount == '0') ? true : false;
    this.showPricingRules = ((!this.noSitesExist) && (!this.noPricingMethod) && (!this.noAmountExist)) ? true : false;
    if (
      (typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0) &&
      (typeof this.addEditDiscountSubmitData != 'undefined') && (this.addEditDiscountSubmitData != null) && (Object.keys(this.addEditDiscountSubmitData).length > 0) &&
      (typeof this.pricingRules != 'undefined') && (this.pricingRules != null) && (this.pricingRules.length > 0)
    ) {
      this.updatePageMode();
    }
  }

  updatePageMode() {
    if ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'add') || ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit'))) {
      this.addEditMode = true;
      this.viewMode = false;
    }
    else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'view') {
      this.addEditMode = false;
      this.viewMode = true;
    }
    // this.initializePricingRulesList();
  }

  executeEditViewPhase() {
    if ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit') || (this.configuratorDiscountDataService.addEditViewDiscountMode == 'view')) {
      this.marketsSelected = this.getMarketListObj(this.configuratorDiscountDataService.addEditDiscountSubmitData.sites);
      this.pricingMethod = this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPriceMethod.methodId;
      this.descriptionBuilderAmount = this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapDescrBuild.amount;
      this.executePricingMethodSubscribeUpdate(this.pricingMethod);
      this.executeMarketList(this.marketsSelected);
      this.executeDescriptionBuilderAmount(this.descriptionBuilderAmount);
    }
  } 

  updateDropDownList() {
    this.pricingCategoryDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'PRICING_CATEGORY');
    this.statementPresentationCodeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'PRESENTATION_CODE');
    if ((typeof this.pricingRules !== 'undefined') && (this.pricingRules !== null) && (this.pricingRules.length > 0)) {
      this.priceBookICOMSCodeDropDownList = this.getPricingBookDropDownList();
    }
  }

  initializePricingRulesList() {
    if ((typeof this.addEditDiscountSubmitData != 'undefined') && (this.addEditDiscountSubmitData != null) && (Object.keys(this.addEditDiscountSubmitData).length > 0)) {
      for (let i=0; i<this.addEditDiscountSubmitData.pricingRules.length; i++) {
        this.pricingRulesList[i] = {};
        this.pricingRulesList[i].pricingCategoryDropDownList = this.pricingCategoryDropDownList;
        this.pricingRulesList[i].statementPresentationCodeDropDownList = this.statementPresentationCodeDropDownList;
        this.pricingRulesList[i].priceBookICOMSCodeDropDownList = this.priceBookICOMSCodeDropDownList;
        this.pricingRulesList[i].pricingCategorySelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PRICING_CATEGORY', this.addEditDiscountSubmitData.pricingRules[i].pricingCategoryName);
        this.pricingRulesList[i].statementPresentationCodeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PRESENTATION_CODE', this.addEditDiscountSubmitData.pricingRules[i].presentationCodeId);
        this.pricingRulesList[i].priceBookICOMSCodeSelectedItems = this.getPricingBookSelectedItemsList(this.addEditDiscountSubmitData.pricingRules[i].pricebookChrgIcomscodeDesc);
        this.pricingRulesList[i].pricebookChrgReltdIcomscode = this.addEditDiscountSubmitData.pricingRules[i].pricebookChrgReltdIcomscode;
        this.pricingRulesList[i].minRequirmnt = this.addEditDiscountSubmitData.pricingRules[i].minRequirmnt;
        this.pricingRulesList[i].codepricingRulesId = this.addEditDiscountSubmitData.pricingRules[i].codepricingRulesId;
        this.pricingRulesList[i].bundleDiscount = this.addEditDiscountSubmitData.pricingRules[i].bundleDiscount;
        this.pricingRulesList[i].amtFrstBundleDiscount = this.addEditDiscountSubmitData.pricingRules[i].amtFrstBundleDiscount;
        this.pricingRulesList[i].pricebookStartDate = this.addEditDiscountSubmitData.pricingRules[i].pricebookStartDate;
        this.pricingRulesList[i].pricebookEndDate = this.addEditDiscountSubmitData.pricingRules[i].pricebookEndDate;
        this.pricingRulesList[i].numOccurnceDiscount = this.addEditDiscountSubmitData.pricingRules[i].numOccurnceDiscount;
        this.pricingRulesList[i].numOfMnths = this.addEditDiscountSubmitData.pricingRules[i].numOfMnths;
        this.pricingRulesList[i].activeService = this.addEditDiscountSubmitData.pricingRules[i].activeService;
        this.pricingRulesList[i].absorb = this.addEditDiscountSubmitData.pricingRules[i].absorb;
        this.pricingRulesList[i].other = this.addEditDiscountSubmitData.pricingRules[i].other;
        this.pricingRulesList[i].fixedPricing = this.addEditDiscountSubmitData.pricingRules[i].fixedPricing;
        this.pricingRulesList[i].amtMinReqPricingCatg = this.addEditDiscountSubmitData.pricingRules[i].amtMinReqPricingCatg;
        this.pricingRulesList[i].campaignDollarOff = this.addEditDiscountSubmitData.pricingRules[i].campaignDollarOff;
        this.pricingRulesList[i].pricingRuleSites = this.getPricingRuleSites(this.addEditDiscountSubmitData.pricingRules[i].pricingRuleSites);
        this.pricingRulesList[i].pricingRulesObjAssociated = this.getPricingRuleObj(this.pricingRulesList[i].pricebookChrgReltdIcomscode);
        this.pricingRulesList[i].descriptionBuilderAmount = this.descriptionBuilderAmount;
        this.pricingRulesList[i].markets = this.marketsSelected;
        this.pricingRulesList[i].pricingMethod = this.pricingMethod;
      }
      this.updateTotalAmnToMinReqPricingCategory();
      this.updateTotalDiscountDollarOff();
      this.updateTotalFirstBundleDiscountAmount();
      this.updateTotalFixedPricingAmount();
      for(let j=0; j<this.pricingRulesList.length; j++) {
        for(let i=0; i<this.pricingRulesList[j]['pricingRuleSites'].length; i++) {
          this.getTotalSitePricing(this.pricingRulesList[j]['pricingRuleSites'][i]['site']);
        }
      }
    } else {
      this.getInitialPricingRulesList();
    }
  }

  getInitialPricingRulesList() {
    let pricingRulesLength = Number(this.pricingRulesList.length);
    this.pricingRulesList[pricingRulesLength] = {};
    this.pricingRulesList[pricingRulesLength].pricingCategoryDropDownList = this.pricingCategoryDropDownList;
    this.pricingRulesList[pricingRulesLength].statementPresentationCodeDropDownList = this.statementPresentationCodeDropDownList;
    this.pricingRulesList[pricingRulesLength].priceBookICOMSCodeDropDownList = this.priceBookICOMSCodeDropDownList;
    this.pricingRulesList[pricingRulesLength].pricingCategorySelectedItems = [];
    this.pricingRulesList[pricingRulesLength].statementPresentationCodeSelectedItems = [];
    this.pricingRulesList[pricingRulesLength].priceBookICOMSCodeSelectedItems = [];
    this.pricingRulesList[pricingRulesLength].pricebookChrgReltdIcomscode = '';
    this.pricingRulesList[pricingRulesLength].minRequirmnt = false;
    this.pricingRulesList[pricingRulesLength].codepricingRulesId = null;
    this.pricingRulesList[pricingRulesLength].bundleDiscount = false;
    this.pricingRulesList[pricingRulesLength].amtFrstBundleDiscount = 0;
    this.pricingRulesList[pricingRulesLength].pricebookStartDate = '';
    this.pricingRulesList[pricingRulesLength].pricebookEndDate = '';
    this.pricingRulesList[pricingRulesLength].numOccurnceDiscount = 0;
    this.pricingRulesList[pricingRulesLength].numOfMnths = 0;
    this.pricingRulesList[pricingRulesLength].activeService = '';
    this.pricingRulesList[pricingRulesLength].absorb = '';
    this.pricingRulesList[pricingRulesLength].other = '';
    this.pricingRulesList[pricingRulesLength].fixedPricing = 0;
    this.pricingRulesList[pricingRulesLength].amtMinReqPricingCatg = 0;
    this.pricingRulesList[pricingRulesLength].campaignDollarOff = 0;
    this.pricingRulesList[pricingRulesLength].pricingRuleSites = this.getPricingRuleSites([]);
    this.pricingRulesList[pricingRulesLength].pricingRulesObjAssociated = {};
    this.pricingRulesList[pricingRulesLength].descriptionBuilderAmount = this.descriptionBuilderAmount;
    this.pricingRulesList[pricingRulesLength].markets = this.marketsSelected;
    this.pricingRulesList[pricingRulesLength].pricingMethod = this.pricingMethod;
    this.configuratorDiscountDataService.addEditDiscountSubmitData.pricingRules[pricingRulesLength] = this.pricingRulesList[pricingRulesLength];
  }

  getPricingRuleSites(pricingRuleSites) {
    let result = [];
    if (pricingRuleSites.length > 0) {
      result =  pricingRuleSites;
    } else {
      for (let i=0; i<this.marketsSelected.length; i++) {
        let pricingRuleSite = {
          'amount': 0,
          'site': this.marketsSelected[i].code,
          'siteId': this.marketsSelected[i].key
        };
        this.totalSiteAmount[this.marketsSelected[i].code] = 0;
        result.push(pricingRuleSite);
      } 
    }
    return result;
  }

  getPricingBookDropDownList() {
    let result = [];
    for (let i = 0; i < this.pricingRules.length; i++) {
      let itemNameValue = this.pricingRules[i]['relatedIcomsCode'] + ' - ' +
        this.pricingRules[i]['icomsCodeDescription'] + ' - ' +
        this.pricingRules[i]['priceBookName'] + ' - ' +
        this.pricingRules[i]['startDate'] + ' - ' +
        this.pricingRules[i]['endDate'];
      result.push({
        'id': this.pricingRules[i]['priceBookId'],
        'itemName': itemNameValue
      });
    }
    return result;
  }

  getPricingBookSelectedItemsList(pricebookChrgIcomscodeDesc) {
    let result = [];
    for (let i = 0; i < this.pricingRules.length; i++) {
      let itemNameValue = this.pricingRules[i]['relatedIcomsCode'] + ' - ' +
        this.pricingRules[i]['icomsCodeDescription'] + ' - ' +
        this.pricingRules[i]['priceBookName'] + ' - ' +
        this.pricingRules[i]['startDate'] + ' - ' +
        this.pricingRules[i]['endDate'];
        if (pricebookChrgIcomscodeDesc == itemNameValue) {
          result.push({
            'id': this.pricingRules[i]['priceBookId'],
            'itemName': itemNameValue
          });
        }
    }
    return result;
  }

  onItemSelect(key: string, item: any, selectType: string, index: string) {
    this.updateSelectedVal(key, item, selectType, index);
  }

  onItemDeSelect(key: string, item: any, selectType: string, index: string) {
    this.updateSelectedVal(key, item, selectType, index);
  }

  onSelectAll(key: string, items: any, selectType: string, index: string) {
    this.updateSelectedVal(key, items, selectType, index);
  }

  onDeSelectAll(key: string, items: any, selectType: string, index: string) {
    this.updateSelectedVal(key, items, selectType, index);
  }

  updateSelectedVal(key: string, items: any, selectType: string, index: string) {
    let resultVal = this.getValueBySelectType(items, selectType);
    this.updateSubmitData(key,index, resultVal);
  }

  getValueBySelectType(item: any, selectType: string) {
    let result;
    if (selectType === 'single') {
      result = this.utilitiesService.getSingleSelectID(item);
    } else {
      result = this.utilitiesService.getMultiSelectID(item)
    }
    return result;
  }

  convertTextAreaContentWithBreaks(field, index,  value) {alert("aaaa")
    this.updateSubmitData(field, index, value);
  }

  updateSubmitData(field, index, value) {
    let indexVal = Number(index)+1;
    this.pricingRulesList[index][field] = value;
    this.configuratorDiscountDataService.addEditDiscountSubmitData.pricingRules = this.pricingRulesList;
    this.configuratorDiscountDataService.isAddEditDiscountModified = true;
  }

  modifyPricingCategoryName(key, index, valueObj) {
    this.updateSubmitData(key, index, valueObj[0]['id']);
    if (Number(index)+1 == this.pricingRulesList.length) {
      this.getInitialPricingRulesList();
    }
  }

  modifyPricingRules(key, index, valueObj) {
    this.updateSubmitData(key, index, valueObj[0]['id']);
  }

  updateMinRequirement(key, index, valueObj){
    this.updateSubmitData(key, index, valueObj);
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
  }

  updateBundleDiscount(key, index, valueObj){
    this.updateSubmitData(key, index, valueObj);
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
  }

  updateFirstBundleDiscountAmount(key, index, valueObj){
    this.updateSubmitData(key, index, valueObj);
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
    this.updateTotalFirstBundleDiscountAmount();
  }

  updateFixedPricing(key, index, valueObj){
    this.updateSubmitData(key, index, Number(valueObj));
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
    this.updateTotalFixedPricingAmount();
  }

  updateAmntMinReqPricingCatg(key, index, valueObj){
    this.updateSubmitData(key, index, Number(valueObj));
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
    this.updateTotalAmnToMinReqPricingCategory();
  }

  updateCmpgnDollarOff(key, index, valueObj){
    this.updateSubmitData(key, index, Number(valueObj));
    this.executePricingRulesCalculation(key, index, this.pricingRulesList[index].priceBookICOMSCodeSelectedItems);
    this.updateTotalDiscountDollarOff();
  }

  updateICOMSCodeChange(key, index, valueObj) {
    this.updateSubmitData(key, index, valueObj[0]['id']);
    this.executePricingRulesCalculation(key, index, valueObj);
  }

  updateTotalFirstBundleDiscountAmount() {
    this.totalAmntToFirstBundleDiscount = 0;
    for(let i=0; i<this.pricingRulesList.length; i++) {
      this.totalAmntToFirstBundleDiscount += Number(this.pricingRulesList[i].amtFrstBundleDiscount);
    }
  }

  updateTotalFixedPricingAmount() {
    this.totalFixedPricing = 0;
    for(let i=0; i<this.pricingRulesList.length; i++) {
      this.totalFixedPricing += Number(this.pricingRulesList[i].fixedPricing);
    }
  }

  updateTotalAmnToMinReqPricingCategory() {
    this.totalAmnToMinReqPricingCategory = 0;
    for(let i=0; i<this.pricingRulesList.length; i++) {
      this.totalAmnToMinReqPricingCategory += Number(this.pricingRulesList[i].amtMinReqPricingCatg);
    }
  }

  updateTotalDiscountDollarOff() {
    this.totalDiscountDollarOff = 0;
    for(let i=0; i<this.pricingRulesList.length; i++) {
      this.totalDiscountDollarOff += Number(this.pricingRulesList[i].campaignDollarOff);
    }
  }

  executePricingRulesCalculation(key, index, valueObj){
    const pricingRuleObj = this.getPricingRuleObj(valueObj[0]['id']);
    this.pricingRulesList[index].pricebookChrgReltdIcomscode = pricingRuleObj['relatedIcomsCode'];
    this.pricingRulesList[index].pricebookStartDate = pricingRuleObj['startDate'];
    this.pricingRulesList[index].pricebookEndDate = pricingRuleObj['endDate'];
    this.pricingRulesList[index].pricingRulesObjAssociated = pricingRuleObj;
    const pricingMethod = this.getPricingMethod(this.pricingMethod);
    if ((pricingMethod == 'A') || (pricingMethod == 'J') || (pricingMethod == 'G') || (pricingMethod == 'H') || (pricingMethod == 'F')) {
      this.executePricingRuleForMethod_AJGHF(index, pricingRuleObj);
    } else if (pricingMethod == 'C') {
      this.executePricingRuleForMethod_C(index, pricingRuleObj);
    } else if (pricingMethod == 'D') {
      this.executePricingRuleForMethod_D(index, pricingRuleObj);
    }
  }

  executePricingRuleForMethod_AJGHF(index, pricingRuleObj) {
    const amount = this.descriptionBuilderAmount;
    if (this.pricingRulesList[index].bundleDiscount) {
      this.executeBundleDiscountYesRule(index);
    } else if ((typeof this.pricingRulesList[index].fixedPricing !== 'undefined') && (this.pricingRulesList[index].fixedPricing !== null) && (this.pricingRulesList[index].fixedPricing !== '') && (this.pricingRulesList[index].fixedPricing !== 0)) {
      this.executeFixedPricingYesRule(index);
    } else if ((!this.pricingRulesList[index].bundleDiscount) && ((typeof this.pricingRulesList[index].amtMinReqPricingCatg !== 'undefined') && (this.pricingRulesList[index].amtMinReqPricingCatg !== null) && (this.pricingRulesList[index].amtMinReqPricingCatg !== '') && (this.pricingRulesList[index].amtMinReqPricingCatg !== 0))) {
      this.executeAmntToAddToMinReqInPricingCategory(index);
    } else {
      this.executeServiceCodeRackRate(index, pricingRuleObj);
    }
  }

  executePricingRuleForMethod_C(index, pricingRuleObj) {
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      let currentMarketPricing: any = Number(this.getPriceBookSiteAmount(this.pricingRulesList[index]['pricingRuleSites'][i]['site'], pricingRuleObj));
      let discountDollarOffAmnt: any = Number(this.pricingRulesList[index]['campaignDollarOff']);
      let result:any = currentMarketPricing - discountDollarOffAmnt;
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = Number(result).toFixed(2).toString();
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    }
  }

  executePricingRuleForMethod_D(index, pricingRuleObj) {
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      let currentMarketPricing: any = Number(this.getPriceBookSiteAmount(this.pricingRulesList[index]['pricingRuleSites'][i]['site'], pricingRuleObj));
      let payPtcNormalRate: any = Number(this.configuratorDiscountDataService.payPercentToNormalRate);
      let result:any = currentMarketPricing * (payPtcNormalRate/100);
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = result.toString();
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    }
  }

  executeBundleDiscountYesRule(index) {
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      let currentAmountToFloat: any = Number(this.descriptionBuilderAmount);
      let totalMinReqPricingCategoryVal = this.getTotalMinReqPricingCategoryVal(index, i);
      let totalAmnToMinReqPricingCategoryToFloat: any = Number(totalMinReqPricingCategoryVal);
      let totalAmntToFirstBundleDiscountToFloat: any = Number(this.pricingRulesList[index].amtFrstBundleDiscount);
      let result: any = currentAmountToFloat - totalAmnToMinReqPricingCategoryToFloat + totalAmntToFirstBundleDiscountToFloat;
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = Number(result).toString();
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    }
  }

  getTotalMinReqPricingCategoryVal(indexVal, siteIndex) {
    let result = 0;
    for (let i=0; i<this.pricingRulesList.length; i++) {
      if ((this.pricingRulesList[i].minRequirmnt) && (i !== indexVal)) {
        result += Number(this.pricingRulesList[i]['pricingRuleSites'][siteIndex]['amount']);
      }
    }
    return result;
  }

  executeFixedPricingYesRule(index) {
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = this.pricingRulesList[index].fixedPricing;
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    }
  }

  executeAmntToAddToMinReqInPricingCategory(index) {
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      // let totalMinReqPricingCategoryVal = this.getTotalMinReqPricingCategoryVal(index, i);
      let totalAmnToMinReqPricingCategoryToFloat: any = this.getTotalMinReqPricingCategoryVal(index, i);
      let getCurrentSiteRackRateValue: any = Number(this.pricingRulesList[index]['pricingRuleSites'][i]['amount']);
      let currentTotalAmnToMinReqToFloat: any = Number(this.pricingRulesList[index].amtMinReqPricingCatg);
      let result: any = ( totalAmnToMinReqPricingCategoryToFloat + currentTotalAmnToMinReqToFloat + getCurrentSiteRackRateValue );
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = result;
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    }
  }

  executeServiceCodeRackRate(index, pricingRuleObj){
    for(let i=0; i<this.pricingRulesList[index]['pricingRuleSites'].length; i++) {
      this.pricingRulesList[index]['pricingRuleSites'][i]['amount'] = this.getPriceBookSiteAmount(this.pricingRulesList[index]['pricingRuleSites'][i]['site'], pricingRuleObj);
      this.getTotalSitePricing(this.pricingRulesList[index]['pricingRuleSites'][i]['site']);
    } 
  }

  getCurrentSiteCalculatedrate(siteName) {
    let result = 0;
    for (let i=0; i<this.pricingRulesList.length; i++) {
      if ((this.pricingRulesList[i].minRequirmnt)) {
        result += Number(this.getSiteMinReqAmnt(siteName, i));
      }
    }
    return result;
  }

  getSiteMinReqAmnt(siteName, index){
    let result = 0;
    for (let i=0; i<this.pricingRulesList[index].pricingRuleSites.length; i++) {
      if ((this.pricingRulesList[index].pricingRuleSites[i].site == siteName)) {
        result += Number(this.pricingRulesList[index].pricingRuleSites[i].amount);
        break;
      }
    }
    return result;
  }

  getPriceBookSiteAmount(siteName, pricingRuleObj) {
    let result = 0;
    for (let i=0; i<pricingRuleObj.priceBookSiteMaps.length; i++) {
      if (pricingRuleObj.priceBookSiteMaps[i].site == siteName) {
        result = Number(pricingRuleObj.priceBookSiteMaps[i].amount);
      }
    }
    return result;
  }


  getPricingRuleObj(pricingRuleID) {
    let result = '';
    for (let i=0; i< this.pricingRules.length; i++) {
      if (this.pricingRules[i].priceBookId === pricingRuleID) {
        result = this.pricingRules[i];
        break;      }
    }
    return result;
  }

  getMarketListObj(sites){
    let marketsList = this.masterData['MARKETS'];
    let result = [];
    for (let i=0; i<marketsList.length; i++) {
      if (sites.indexOf(marketsList[i].key) > -1) {
        result.push(marketsList[i]);
      }
    }
    return result;
  }

  getPricingMethod(pricingMethod) {
    let result = '';
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      if (Number(this.masterData.priceMethodMasterDataList[i].discPriceMethodMasterId) === Number(pricingMethod)) {
        result = this.masterData.priceMethodMasterDataList[i].method;
        break;
      } 
    }
    return result;
  }

  getTotalSitePricing(siteName){
    let result = 0;
    for (let i=0; i<this.pricingRulesList.length; i++) {
        result += this.getSiteMinReqAmnt(siteName, i);
    }
    this.totalSiteAmount[siteName] = result;
  }

}


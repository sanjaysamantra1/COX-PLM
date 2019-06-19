import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GetCampaignCodePricingMethod } from '../discount-interface';
import { DiscountService } from '../discount.service';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';

@Component({
  selector: 'plm-campaign-code-creation-pricing-method',
  templateUrl: './campaign-code-creation-pricing-method.component.html',
  styleUrls: ['./campaign-code-creation-pricing-method.component.css']
})
export class CampaignCodeCreationPricingMethodComponent implements OnInit {

  // @Input() masterData: any;
  // @Input() addEditDiscountSubmitData: any;

  private masterData: any;
  private addEditDiscountSubmitData: any;
  private addEditMode: Boolean;
  private viewMode: Boolean;
  private Ashow: boolean;
  private Bshow: boolean;
  private Cshow: boolean;
  private Dshow: boolean;
  private Eshow: boolean;
  private Fshow: boolean;
  private Gshow: boolean;
  private Hshow: boolean;
  private Ishow: boolean;
  private Jshow: boolean;
  private pricingMethods: string[];
  private formLoaded: boolean;
  a:any;
  b:any;
  c:any;
  d:any;

  constructor(private configuratorDiscountDataService: ConfiguratorDiscountDataService) {
    this.addEditMode = false;
    this.viewMode = false;
    this.pricingMethods = [];
    this.masterData = this.configuratorDiscountDataService.discountMasterData;
    this.initializePricingMethods();
    this.formLoaded = false;
    this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
    this.updateMethodAttributesForPriceMethod();
    this.updatePriceMethod(this.a,this.b,this.c,this.d);
    if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
      this.onChange(this.addEditDiscountSubmitData.discMapPriceMethod.methodId);
      this.formLoaded = true;
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (let propName in changes) {
    //   let change = changes[propName];
    //   if (propName === 'masterData') {
    //     this.masterData = ((typeof change.currentValue != 'undefined') && (change.currentValue != null) && (Object.keys(change.currentValue).length > 0)) ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
    //   } else if (propName === 'addEditDiscountSubmitData') {
    //     this.addEditDiscountSubmitData = ((typeof change.currentValue != 'undefined') && (change.currentValue != null) && (Object.keys(change.currentValue).length > 0)) ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
    //   }
    // }
    // if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
    //   this.onChange(this.addEditDiscountSubmitData.discMapPriceMethod.priceMethodId);
    // }
  }

  updateMethodAttributesForPriceMethod() {
    if ((this.addEditDiscountSubmitData.discMapPriceMethod == null) || (this.addEditDiscountSubmitData.discMapPriceMethod.length == 0) || (typeof this.addEditDiscountSubmitData.discMapPriceMethod == 'undefined')) {

    }
  }

  initializePricingMethods() {
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      this.pricingMethods.push(this.masterData.priceMethodMasterDataList[i]['method']);
      this.masterData.priceMethodMasterDataList[i]['showVal'] = false;
      this.updateQuestionSec(this.masterData.priceMethodMasterDataList[i]['discPriceMethodMasterDetailList']);
    }
    this.updatePageMode();
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
  }

  updateQuestionSec(quesArray) {
    for (let i = 0; i < quesArray.length; i++) {
      quesArray[i]['value'] = '';
    }
  }
  f1(abcd) {
    alert("this is f1")
  }

  onChange(selectedValue) {
    this.updateSubmitData('methodId', selectedValue);
    console.log("selected-value: " + selectedValue);
    if (selectedValue == null) {
      this.showAllSections();
    } else {
      this.hideAllSections();
      this.updateRowShowVal(selectedValue);
    }
  }
  updatePriceMethod(j, methodId, methodValue, typeVal) {
    console.log("inside update")
    console.log(j, methodId, methodValue, typeVal)
    let methodAttrValue = '';
    if (typeVal == 'checkbox') {
      methodAttrValue = (methodValue) ? 'Y' : 'N';
    } else {
      methodAttrValue = methodValue;
    }
    this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPriceMethod['methodAttributes'][j] = {
      'methodAttrId': '',
      'methodAttrValue': ''
    };
    this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPriceMethod['methodAttributes'][j]['methodAttrId'] = methodId;
    this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPriceMethod['methodAttributes'][j]['methodAttrValue'] = methodAttrValue;
    this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    if (methodId == 5) {
      this.configuratorDiscountDataService.payPercentToNormalRate = methodAttrValue;
    }
  }

  updateRowShowVal(selectedValue) {
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      if ((this.addEditDiscountSubmitData.discMapPriceMethod.methodId !== null) && ((this.addEditDiscountSubmitData.discMapPriceMethod.methodId == this.masterData.priceMethodMasterDataList[i]['discPriceMethodMasterId'])) && ((this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes == null) || (this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.length == 0) || (typeof this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes == 'undefined'))) {
        this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes = [];
        
        for (let j = 0; j < this.masterData.priceMethodMasterDataList[i]['discPriceMethodMasterDetailList'].length; j++) {
          let result = {
            'methodAttrId': this.masterData.priceMethodMasterDataList[i]['discPriceMethodMasterDetailList'][j]['methodId'],
            'methodAttrValue': 'aaaaaaaaaaa',
            
          };
          this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.push(result);
          var output = '';
          for (var property in this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes) {
            output += property + ': ' + JSON.stringify(this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[property])+'; ';
          }
          console.log("sanjay-1: "+output);
          this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.forEach(function (element, index) {
           // this.updatePriceMethod(index, element.methodId, element.Value, element.inputType)
          });
        }
      }

      if (Number(this.masterData.priceMethodMasterDataList[i].discPriceMethodMasterId) === Number(selectedValue)) {
        this.masterData.priceMethodMasterDataList[i]['showVal'] = true;
        this.updatePricingMethodAttributes(selectedValue, i);
        break;
      }
    }
  }

  updatePricingMethodAttributes(selectedValue, index) {
    if (this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.length > 0) {
      this.updatePricingMethodQuestions(index);
      this.configuratorDiscountDataService.modifyPricingMethod(selectedValue);
    }
  }

  updatePricingMethodQuestions(index) {
    for (let i = 0; i < this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList.length; i++) {
      if (this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList[i].methodId == this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i].methodAttrId) {
        if (this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList[i].inputType == 'checkbox') {
          this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList[i].value = (this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i].methodAttrValue == 'Y') ? true : false;
          this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList[i].checked = true;
        } else {
          this.masterData.priceMethodMasterDataList[index].discPriceMethodMasterDetailList[i].value = this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i].methodAttrValue;
        }
      }
    }
  }

  hideAllSections() {
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      this.masterData.priceMethodMasterDataList[i]['showVal'] = false;
    }
  }


  showAllSections() {
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      this.masterData.priceMethodMasterDataList[i]['showVal'] = true;
    }
  }

  getSelectedValueObj(key) {
    let result = '';
    for (let i = 0; i < this.masterData['DISC_PRICE_METHOD_MASTER'].length; i++) {
      if (this.masterData['DISC_PRICE_METHOD_MASTER'][i]['key'] == key) {
        result = this.masterData['DISC_PRICE_METHOD_MASTER'][i]['method'];
      }
    }
    return result;
  }



  updateSubmitData(field, value) {
    console.log("field: " + field)
    console.log("field: " + value)
    this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPriceMethod[field] = value;
    this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    this.configuratorDiscountDataService.modifyPricingMethod(value);
  }

  getDisplayValue(discPriceMethodMasterData, methodId, inputType, index) {
    let result: any;
    let methodAttributesIDArray = this.getMethodAttributesMethodIDS();
    console.log(this.addEditDiscountSubmitData.discMapPriceMethod.methodId + ' == ' + discPriceMethodMasterData.discPriceMethodMasterId);
    console.log(methodAttributesIDArray.indexOf(methodId));
    if ((this.addEditDiscountSubmitData.discMapPriceMethod.methodId == discPriceMethodMasterData.discPriceMethodMasterId) && (methodAttributesIDArray.indexOf(methodId) > -1)) {
      console.log(index);
      console.log(methodAttributesIDArray);
      console.log(methodId);
      console.log(inputType);
      // for (let i=0; i<this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.length; i++) {
      // let methodObj: any =  this.getMethodObj(this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i], discPriceMethodMasterData.discPriceMethodMasterDetailList);
      // console.log(this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i].methodAttrValue);
      if (inputType == 'checkbox') {
        console.log(this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[index].methodAttrValue);
        result = (this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[index].methodAttrValue == 'Y') ? true : false;
        console.log(result);

        // return result;
      } else {
        result = this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[index].methodAttrValue;
        console.log(result);
        // return result;
      }
      //   break;
      // }
    }
    // let priceMethodMasterDataList = this.getPriceMethodMasterDataList(discPriceMethodMasterId);
    // let methodObj = this.getMethodObj(priceMethodMasterDataList, methodId);
    console.log(result);
    return result;
  }

  getMethodAttributesMethodIDS() {
    let result = [];
    for (let i = 0; i < this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes.length; i++) {
      result.push(this.addEditDiscountSubmitData.discMapPriceMethod.methodAttributes[i].methodAttrId);
    }
    return result;
  }

  getMethodObj(methodAttribute, discPriceMethodMasterDetailList) {
    let result = '';
    for (let i = 0; i < discPriceMethodMasterDetailList.length; i++) {
      if (discPriceMethodMasterDetailList[i].methodId == methodAttribute.methodAttrId) {
        result = discPriceMethodMasterDetailList[i];
        break;
      }
    }
    return result;
  }

  getPriceMethodMasterDataList(discPriceMethodMasterId) {
    let result = '';
    for (let i = 0; i < this.masterData.priceMethodMasterDataList.length; i++) {
      if (this.addEditDiscountSubmitData.discMapPriceMethod.methodId == this.masterData.priceMethodMasterDataList[i].discPriceMethodMasterId) {
        result = this.masterData.priceMethodMasterDataList[i];
      }
    }
    return result;
  }


  isCheckbox(discPriceMethodMasterDetailList, methodId) {
    let result = false;
    for (let i = 0; i < discPriceMethodMasterDetailList.length; i++) {
      if (discPriceMethodMasterDetailList[i].methodId == methodId) {
        result = (discPriceMethodMasterDetailList[i].inputType == 'checkbox') ? true : false;
      }
    }
    return result;
  }

  getCheckboxValueInUserData() {
    let result = '';

  }

}

import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { RequestorService } from '../../../../requestor/services/requestor.service';
import { RequestorDataService } from '../../../../requestor/services/requestor-data.service';

import { IntakeRequestMasterData, FetchAllIntakeRequest, RequestorRequestInterface, RequestorResponseInterface, IntakeFormReq, IntakeRequestForm, 
  IntakeRequestFormIntakeForm } from '../../../../requestor/requestor.interface';



@Component({
  selector: 'plm-intake-request-detail-intake-form',
  templateUrl: './intake-request-detail-intake-form.component.html',
  styleUrls: ['./intake-request-detail-intake-form.component.css']
})
export class IntakeRequestDetailIntakeFormComponent implements OnInit {


  @Input() addEditIntakeRequestForm: IntakeRequestForm;
  @Input() addEditIntakeRequestMasterData: IntakeRequestMasterData;
  private showIntakeFormHeader: Boolean;
  private addEditMode: Boolean;
  private viewMode: Boolean;
  private discountStartMinDate: Date;
  private discountEndMinDate: Date;
  private campaignCodesToChangeDropDownList = [];
  private campaignCodesToChangeSelectedItems = [];
  private stepupDuratnIdDropDownList = [];
  private stepupDuratnIdSelectedItems = [];
  private requirePLGDropDownList = [];
  private requirePLGSelectedItems = [];
  private tierRequirementsDropDownList = [];
  private tierRequirementsSelectedItems = [];
  private singleSelectSettings = {};
  private multiSelectSettings = {};
  private discountExpireDate: any;

  constructor(private requestorService: RequestorService, private requestorDataService: RequestorDataService) {
    this.addEditIntakeRequestMasterData = this.requestorDataService.addEditIntakeRequestMasterData;
    this.showIntakeFormHeader = false;
    this.addEditMode = false;
    this.viewMode = true;
    this.updatePageMode();
  }

  ngOnInit() {
    this.singleSelectSettings = {
      singleSelection: true,
      text: "Select One",
      enableSearchFilter: true
    }; 
    this.multiSelectSettings = {
        singleSelection: false,
        text: "Select",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class",
        badgeShowLimit: 3,
        maxHeight: 120
    };         
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'addEditIntakeRequestForm') {
          this.addEditIntakeRequestForm =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      }  else if (propName === 'addEditIntakeRequestMasterData') {
        this.addEditIntakeRequestMasterData = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      }
    }
    if (typeof this.addEditIntakeRequestMasterData.intakeFormMasterDropDown !== 'undefined') {
      this.updateDropDownList();
      if ((typeof this.addEditIntakeRequestForm !== 'undefined') && (this.addEditIntakeRequestForm.projectMasterModel !== null)) {
        this.updateSelectedItems();
         this.intializeProjectDate();
      }
    }

  }

  getAddEditIntakeRequestMasterDataObj() {
    this.requestorService.getCreateUpdateIntakeRequestFormData().subscribe(
      data => {
        this.addEditIntakeRequestMasterData = data;
        this.requestorDataService.addEditIntakeRequestMasterData = data;
        this.updateDropDownList();
        this.intializeProjectDate();
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }

  updateDropDownList() {
    this.campaignCodesToChangeDropDownList = this.getCampaignCodesForChangeDropDownList(this.addEditIntakeRequestMasterData);
    this.stepupDuratnIdDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'STEPUP_DURATION');
    this.requirePLGDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'REQUIRE_PLG');
    this.tierRequirementsDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'TIER_REQUIREMENTS');
  }

  updateSelectedItems(){
    this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlgVal = ( this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlg ) ? true : false;
    this.campaignCodesToChangeSelectedItems = this.getCampaignCodesListSelectedItemsObject(this.addEditIntakeRequestMasterData, this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.campCodeIds);
    this.stepupDuratnIdSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'STEPUP_DURATION', this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.stepupDuratnId);
    this.requirePLGSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'REQUIRE_PLG', this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.requirePlgId);
    this.tierRequirementsSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'TIER_REQUIREMENTS', this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.tireqIds);
  }

  getDropDownList(masterData, dropDownKey) {
    let result = [];
    if ((typeof masterData.intakeFormMasterDropDown !== 'undefined') && (masterData.intakeFormMasterDropDown !== null)) {
    for (let i = 0; i < masterData.intakeFormMasterDropDown[dropDownKey].length; i++) {
      result.push({
        "id": masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId'],
        "itemName": masterData.intakeFormMasterDropDown[dropDownKey][i]['objectName']
      });
    }
  }
    return result;
  }

  getCampaignCodesForChangeDropDownList(masterData) {
    let result = [];
    if ((typeof masterData.campaignCodesList !== 'undefined') && (masterData.campaignCodesList !== null)) {
      if ((typeof masterData.campaignCodesList !== 'undefined') && (masterData.campaignCodesList !== null) && (masterData.campaignCodesList.length > 0)) {
        for (let i = 0; i < masterData.campaignCodesList.length; i++) {
          result.push({
            "id": masterData.campaignCodesList[i]['key'],
            "itemName": masterData.campaignCodesList[i]['value']
          });
        }
      }
    }
    return result;
  }

  getSelectedItemsObject(masterData, dropDownKey, dropDownList) {
    let result = [];
    if ((typeof masterData.intakeFormMasterDropDown !== 'undefined') && (masterData.intakeFormMasterDropDown !== null)) {
    for (let i = 0; i < masterData.intakeFormMasterDropDown[dropDownKey].length; i++) {
      if((dropDownList instanceof Array) && (dropDownList.indexOf(masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId']) > -1)){
        result.push({
          "id": masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId'],
          "itemName": masterData.intakeFormMasterDropDown[dropDownKey][i]['objectName']
        });
      } else if (masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId'] == dropDownList) {
        result.push({
          "id": masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId'],
          "itemName": masterData.intakeFormMasterDropDown[dropDownKey][i]['objectName']
        });
      }
    }
  }
    return result;
  }

  getCampaignCodesListSelectedItemsObject(masterData, dropDownListVal) {
    let result = [], dropDownList = [];
    for (let j=0; j<dropDownListVal.length; j++) {
      dropDownList.push(dropDownListVal[j].toString());
    }
    if ((typeof masterData.campaignCodesList !== 'undefined') && (masterData.campaignCodesList !== null)) {
      for (let i = 0; i < masterData.campaignCodesList.length; i++) {
        if((dropDownList instanceof Array) && (dropDownList.indexOf(masterData.campaignCodesList[i]['key']) > -1)){
          result.push({
            "id": masterData.campaignCodesList[i]['key'],
            "itemName": masterData.campaignCodesList[i]['value']
          });
        } else if (masterData.campaignCodesList[i]['key'] == dropDownList) {
          result.push({
            "id": masterData.campaignCodesList[i]['key'],
            "itemName": masterData.campaignCodesList[i]['value']
          });
        }
      }
    }
    return result;
  }

  updatePageMode(){
    if ((this.requestorDataService.addEditViewIntakeRequestMode == 'add') || ((this.requestorDataService.addEditViewIntakeRequestMode == 'edit'))) {
      this.addEditMode = true;
      this.viewMode = false;
      this.showIntakeFormHeader = (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') ? true : false;
    } else if (this.requestorDataService.addEditViewIntakeRequestMode == 'view') {
      this.addEditMode = false;
      this.viewMode = true;
    }
  }

  intializeProjectDate() {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    this.discountStartMinDate = new Date(todayYear, todayMonth, todayDate);
    this.discountEndMinDate = new Date(todayYear, todayMonth, todayDate);
  }

   startDateChanged(discountStartDate) {
    const startDateObj = new Date(discountStartDate);
    const endMinDate = Number(startDateObj.getDate()) + 1;
    const endMinMonth = startDateObj.getMonth();
    const endMinYear = startDateObj.getFullYear();
    this.discountEndMinDate = new Date(endMinYear, endMinMonth, endMinDate);
    this.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel.discountExpireDate = '';
    this.updateSubmitData('discountStartDate', discountStartDate);
  }

  onCampaignCodesToChangeItemSelect(item: any) {
      this.updateSubmitData('campCodeIds', this.requestorService.getMultiSelectID(this.campaignCodesToChangeSelectedItems));
  }
  
  onCampaignCodesToChangeItemDeSelect(item: any) {
      this.updateSubmitData('campCodeIds', this.requestorService.getMultiSelectID(this.campaignCodesToChangeSelectedItems));
  }

  onstepupDuratnIdItemSelect(item: any) {
      this.updateSubmitData('stepupDuratnId', this.requestorService.getSingleSelectID(this.stepupDuratnIdSelectedItems));
  }
  
  onstepupDuratnIdItemDeSelect(item: any) {
      this.updateSubmitData('stepupDuratnId', this.requestorService.getSingleSelectID(this.stepupDuratnIdSelectedItems));
  }

  onRequirePLGItemSelect(item: any) {
      this.updateSubmitData('requirePlgId', this.requestorService.getSingleSelectID(this.requirePLGSelectedItems));
  }
  
  onRequirePLGItemDeSelect(item: any) {
      this.updateSubmitData('requirePlgId', this.requestorService.getSingleSelectID(this.requirePLGSelectedItems));
  }

  onTierRequirementsItemSelect(item: any) {
    this.updateSubmitData('tireqIds', this.requestorService.getMultiSelectID(this.tierRequirementsSelectedItems));
  }
  
  onTierRequirementsItemDeSelect(item: any) {
    this.updateSubmitData('tireqIds', this.requestorService.getMultiSelectID(this.tierRequirementsSelectedItems));
  }

  onSelectAll(items: any, key: string) {
    this.updateSubmitData(key, this.requestorService.getMultiSelectID(items));
  }
  onDeSelectAll(items: any, key: string) {
    this.updateSubmitData(key, this.requestorService.getMultiSelectID(items));
  }
  
  updateSubmitData(field, value) {
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel[field] = value;
    this.requestorDataService.isAddEditIntakeRequestFormModified = true;
  }

  updateInstallationIncludedSubmitData(field, tempField, value) {
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel[field] = value;
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.intakeFormReqTxnDetModel[field] = (value);
    this.requestorDataService.isAddEditIntakeRequestFormModified = true;
  }

  isInstallationIncludedTrue(data) {
    if (data) {
      return true;
    } else {
      return false;
    }
  }

}



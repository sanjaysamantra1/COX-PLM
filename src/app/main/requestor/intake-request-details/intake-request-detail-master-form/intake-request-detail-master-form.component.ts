import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RequestorService } from '../../services/requestor.service';
import { RequestorDataService } from '../../services/requestor-data.service';
import { IntakeRequestMasterData, FetchAllIntakeRequest, RequestorRequestInterface, RequestorResponseInterface, IntakeFormReq, IntakeRequestForm, IntakeRequestFormIntakeForm } from '../../../requestor/requestor.interface';
import { AppConfigService } from '../../../../shared/services/app-config.service';

@Component({
  selector: 'plm-intake-request-detail-master-form',
  templateUrl: './intake-request-detail-master-form.component.html',
  styleUrls: ['./intake-request-detail-master-form.component.css']
})
export class IntakeRequestDetailMasterFormComponent implements OnInit, OnChanges {

  @Input() addEditIntakeRequestForm: IntakeRequestForm;
  @Input() addEditIntakeRequestMasterData: IntakeRequestMasterData;
  @Output() fileUpload: EventEmitter<any> = new EventEmitter<any>();
  private formDataLoaded: Boolean;
  private isAllSitesSelected: Boolean;
  private sitesSelected: Boolean;
  private selectSite: Object;
  private selectedAll: Boolean;
  private sites: number[];
  private projectStartMinDate: Date;
  private projectEndMinDate: Date;
  private addEditMode: Boolean;
  private showDownloadUrl: Boolean;
  private viewMode: Boolean;
  private fileToUpload: File = null;
  private intakeRequestStatusIdDropDownList = [];
  private intakeRequestStatusIdSelectedItems = [];
  private intakeRequestTypeDropDownList = [];
  private intakeRequestTypeSelectedItems = [];
  private pricingOwnerIdDropDownList = [];
  private pricingOwnerIdSelectedItems = [];
  private trgtAudienceIdDropDownList = [];
  private trgtAudienceIdSelectedItems = [];
  private channelIdsDropDownList = [];
  private channelIdsSelectedItems = [];
  private categoryIdDropDownList = [];
  private categoryIdSelectedItems = [];
  private productIdsDropDownList = [];
  private productIdsSelectedItems = [];
  private priorityIdDropDownList = [];
  private priorityIdSelectedItems = [];
  private singleSelectSettings = {};
  private multiSelectSettings = {};
  private noIntakeRequestType: Boolean;
  private showIntakeRequestForm: Boolean;
  private downloadFileUrl: string;
  private fileSizeExceeded: Boolean;

  constructor(private requestorService: RequestorService, private requestorDataService: RequestorDataService, private appConfigService: AppConfigService) {
    this.formDataLoaded = false;
    this.addEditMode = false;
    this.showDownloadUrl = false;
    this.viewMode = false;
    this.isAllSitesSelected = false;
    this.sitesSelected = true;
    this.selectSite = {};
    this.selectedAll = false;
    this.showIntakeRequestForm = false;
    this.downloadFileUrl = '';
    this.fileSizeExceeded = false;
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
        this.addEditIntakeRequestForm = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      } else if (propName === 'addEditIntakeRequestMasterData') {
        this.addEditIntakeRequestMasterData = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
      }
    }
    if (typeof this.addEditIntakeRequestMasterData.intakeFormMasterDropDown !== 'undefined') {
      this.updateDropDownList();
      this.checkIsFormDataLoaded();
      this.updatePageMode();
      this.intializeProjectDate();
      this.initializeSelectedItems();
      for (let i=0; i < this.addEditIntakeRequestForm.projectMasterModel.sites.length; i++) {
        const currentSite = this.addEditIntakeRequestForm.projectMasterModel.sites[i];
        this.selectSite[currentSite] = this.isSitesExist(currentSite);
      }
    }
  }


  getAddEditIntakeRequestMasterData() {
    this.requestorService.getCreateUpdateIntakeRequestFormData().subscribe(
      data => {
        this.addEditIntakeRequestMasterData = data;
        this.updateDropDownList();
        this.checkIsFormDataLoaded();
        this.updatePageMode();
        this.intializeProjectDate();
        if ((typeof this.addEditIntakeRequestMasterData !== 'undefined') && (typeof this.requestorDataService.addEditViewIntakeRequestMode !== 'undefined') && (this.requestorDataService.addEditViewIntakeRequestMode !== 'add')) {
          this.initializeSelectedItems();
        }
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }

  updateDropDownList() {
    this.intakeRequestTypeDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'INTAKE_REQUEST_TYPE');
    this.pricingOwnerIdDropDownList = this.getPricingOwnerDropDownList(this.addEditIntakeRequestMasterData);
    this.intakeRequestStatusIdDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'INTAKE_REQUEST_STATUS');
    this.trgtAudienceIdDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'TARGET_AUDIENCE');
    this.channelIdsDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'CHANNELS');
    this.categoryIdDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'INTAKE_CATEGORY');
    this.productIdsDropDownList = this.getproductIdsDropDownList(this.addEditIntakeRequestMasterData);
    this.priorityIdDropDownList = this.getDropDownList(this.addEditIntakeRequestMasterData, 'INTAKE_PRIORITY');
    this.showIntakeRequestForm = true;
    if ((typeof this.addEditIntakeRequestMasterData !== 'undefined') && (typeof this.addEditIntakeRequestForm !== 'undefined') && (typeof this.requestorDataService.addEditViewIntakeRequestMode !== 'undefined') && (this.addEditIntakeRequestForm.projectMasterModel !== null)) {
      this.initializeSelectedItems();
    }
  }

  initializeSelectedItems() {
        this.intakeRequestTypeSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'INTAKE_REQUEST_TYPE', this.addEditIntakeRequestForm.projectMasterModel.projectTypeId);
        this.pricingOwnerIdSelectedItems = this.getPricingOwnerSelectedItemsObject(this.addEditIntakeRequestMasterData, this.addEditIntakeRequestForm.projectMasterModel.pricingOwnerId);
        this.intakeRequestStatusIdSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'INTAKE_REQUEST_STATUS', this.addEditIntakeRequestForm.projectMasterModel.intakeRequestStatusId);
        this.trgtAudienceIdSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'TARGET_AUDIENCE', this.addEditIntakeRequestForm.projectMasterModel.trgtAudienceId);
        this.channelIdsSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'CHANNELS', this.addEditIntakeRequestForm.projectMasterModel.channelIds);
        this.categoryIdSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'INTAKE_CATEGORY', this.addEditIntakeRequestForm.projectMasterModel.categoryId);
        this.productIdsSelectedItems = this.getproductIdsSelectedItemsObject(this.addEditIntakeRequestMasterData, this.addEditIntakeRequestForm.projectMasterModel.productIds);
        this.priorityIdSelectedItems = this.getSelectedItemsObject(this.addEditIntakeRequestMasterData, 'INTAKE_PRIORITY', this.addEditIntakeRequestForm.projectMasterModel.priorityId);
        this.downloadFileUrl = this.appConfigService.url + '/plm-engine/requester/v0/project/' + this.addEditIntakeRequestForm.projectMasterModel.projectCode +'/files/'+ this.addEditIntakeRequestForm.projectMasterModel.uploadIntakeRequestDocId;
  }

  getDropDownList(masterData, dropDownKey) {
    let result = [];
    for (let i = 0; i < masterData.intakeFormMasterDropDown[dropDownKey].length; i++) {
      result.push({
        "id": masterData.intakeFormMasterDropDown[dropDownKey][i]['intakeFormDrpdwnDetailId'],
        "itemName": masterData.intakeFormMasterDropDown[dropDownKey][i]['objectName']
      });
    }
    return result;
  }

  getPricingOwnerDropDownList(masterData) {
    let result = [];
    for (let i = 0; i < masterData.pricingOwners.length; i++) {
      result.push({
        "id": masterData.pricingOwners[i]['userId'],
        "itemName": masterData.pricingOwners[i]['firstname'] + ' ' + masterData.pricingOwners[i]['lastname']
      });
    }
    return result;
  }

  getproductIdsDropDownList(masterData) {
    let result = [];
    for (let i = 0; i < masterData.products.length; i++) {
      result.push({
        "id": masterData.products[i]['psuTypeId'],
        "itemName": masterData.products[i]['psuName']
      });
    }
    return result;
  }

  getSelectedItemsObject(masterData, dropDownKey, dropDownList) {
    let result = [];
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
    return result;
  }

  getproductIdsSelectedItemsObject(masterData, dropDownListVal) {
    let result = [], dropDownList = [];
    for (let j=0; j<dropDownListVal.length; j++) {
      dropDownList.push(dropDownListVal[j].toString());
    }
    for (let i = 0; i < masterData.products.length; i++) {
      if((dropDownList instanceof Array) && (dropDownList.indexOf(masterData.products[i]['psuTypeId']) > -1)){
        result.push({
          "id": masterData.products[i]['psuTypeId'],
          "itemName": masterData.products[i]['psuName']
        });
      } else if (masterData.products[i]['psuTypeId'] == dropDownList) {
        result.push({
          "id": masterData.products[i]['psuTypeId'],
          "itemName": masterData.products[i]['psuName']
        });
      }
    }
    return result;
  }

  getPricingOwnerSelectedItemsObject(masterData, dropDownList) {
    let result = [];
    for (let i = 0; i < masterData.pricingOwners.length; i++) {
      if((dropDownList instanceof Array) && (dropDownList.indexOf(masterData.pricingOwners[i]['userId']) > -1)){
        result.push({
          "id": masterData.pricingOwners[i]['userId'],
          "itemName": masterData.pricingOwners[i]['firstname'] + ' ' + masterData.pricingOwners[i]['lastname']
        });
      } else if (masterData.pricingOwners[i]['userId'] == dropDownList) {
        result.push({
          "id": masterData.pricingOwners[i]['userId'],
          "itemName": masterData.pricingOwners[i]['firstname'] + ' ' + masterData.pricingOwners[i]['lastname']
        });
      }
    }
    return result;
  }


  checkIsFormDataLoaded() {
    if (typeof this.addEditIntakeRequestMasterData != 'undefined') {
      this.formDataLoaded = true;
    } else {
      this.formDataLoaded = false;
    }
  }

  updatePageMode() {
    if ((this.requestorDataService.addEditViewIntakeRequestMode == 'add') || ((this.requestorDataService.addEditViewIntakeRequestMode == 'edit'))) {
      this.addEditMode = true;
      this.showDownloadUrl = (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') ? true : false;
      this.viewMode = false;
    } 
    else if (this.requestorDataService.addEditViewIntakeRequestMode == 'view') {
      this.addEditMode = false;
      this.showDownloadUrl = true;
      this.viewMode = true;
    }
  }

  intializeProjectDate() {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    this.projectStartMinDate = new Date(todayYear, todayMonth, todayDate);
    this.projectEndMinDate = new Date(todayYear, todayMonth, todayDate);
  }

  startDateChanged(startDate) {
    const startDateObj = new Date(startDate);
    const endMinDate = Number(startDateObj.getDate()) + 10;
    const endMinMonth = startDateObj.getMonth();
    const endMinYear = startDateObj.getFullYear();
    this.projectEndMinDate = new Date(endMinYear, endMinMonth, endMinDate);
    this.addEditIntakeRequestForm.projectMasterModel.projectEndDt = '';
    this.updateSubmitData('projectStartDt', startDate);
  }

  isAllSitesSelectedCheck() {
    const marketSitesLength = Object.keys(this.addEditIntakeRequestMasterData.mapMarketList).length;
    if (this.addEditIntakeRequestForm.projectMasterModel.sites.length === marketSitesLength) {
      this.selectedAll = true;
      return true;
    } else {
      this.selectedAll = false;
      return false;
    }
  }

  isSitesExist(site) {
    let result = false;
    for (let i=0; i < this.addEditIntakeRequestForm.projectMasterModel.sites.length; i++) {
      if (Number(this.addEditIntakeRequestForm.projectMasterModel.sites[i]) == parseInt(site)) {
        result = true;
        break;
      }
    }
    this.selectSite[parseInt(site)] = result;
    this.selectSite[site] = result;    
    return result;
  }

  selectAll(selectedAll) {
    if (selectedAll) {
      let sitesList = Object.keys(this.addEditIntakeRequestMasterData.mapMarketList);
      this.addEditIntakeRequestForm.projectMasterModel.sites = [];
      for (let i=0; i<sitesList.length; i++) {
        this.addEditIntakeRequestForm.projectMasterModel.sites.push(Number(sitesList[i]));
      }
      this.isAllSitesSelected = true;
    } else {
      this.addEditIntakeRequestForm.projectMasterModel.sites = [];
      this.isAllSitesSelected = false;
    }
    this.sites = this.addEditIntakeRequestForm.projectMasterModel.sites;
    this.validateIsSitesSelected();
    this.updateSubmitData('sites', this.convertArrayElementsToString(this.sites));
  }

  validateIsSitesSelected() {
    if (this.addEditIntakeRequestForm.projectMasterModel.sites.length > 0) {
      this.sitesSelected = true;
    } else {
      this.sitesSelected = false;
    }
  }

  addSite(selectSite, siteValue) {
    if (selectSite) {
      this.addEditIntakeRequestForm.projectMasterModel.sites.push(parseInt(siteValue));
      this.sites = this.addEditIntakeRequestForm.projectMasterModel.sites;
    } else {
      const sitesVal = JSON.parse(JSON.stringify(this.addEditIntakeRequestForm.projectMasterModel.sites));
      if (sitesVal.indexOf(Number(siteValue)) > -1) {
        sitesVal.splice(sitesVal.indexOf(Number(siteValue)), 1);
      }
      this.addEditIntakeRequestForm.projectMasterModel.sites = sitesVal;
      this.sites = sitesVal;
    }
    this.validateIsSitesSelected();
    this.isAllSitesSelectedCheck();
    this.updateSubmitData('sites', this.convertArrayElementsToString(this.sites));
  }

  handleFileInput(files: FileList, event: any) {
    this.fileSizeExceeded = false;
    this.fileToUpload = files.item(0);
    const fileSizeInMB = (this.fileToUpload.size / (1024*1024)).toFixed(2);
    if (parseFloat(fileSizeInMB) > parseFloat(Number(20).toFixed(2))) {
      event.target.value = null;
      this.fileSizeExceeded = true;
      return false;
    }
    this.updateSubmitData('uploadIntakeRequestDoc', JSON.stringify(this.fileToUpload));
    this.fileUpload.emit(this.fileToUpload);
  }

  updateSubmitData(field, value) {
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel[field] = value;
    this.requestorDataService.isAddEditIntakeRequestFormModified = true;
  }

  downloadDECFile() {
    window.open('C:/Users/tkannan/eclipse-workspace/PLM_Docs/Requester_configrator_changesv0.5.pptx');
  }

  onIntakeRequestTypeItemSelect(item: any) {
    this.updateSubmitData('projectTypeId', this.requestorService.getSingleSelectID(this.intakeRequestTypeSelectedItems));
  }

  onIntakeRequestTypeItemDeSelect(item: any) {
    this.updateSubmitData('projectTypeId', this.requestorService.getSingleSelectID(this.intakeRequestTypeSelectedItems));
  }

  onpricingOwnerIdItemSelect(item: any) {
    this.updateSubmitData('pricingOwnerId', this.requestorService.getSingleSelectID(this.pricingOwnerIdSelectedItems));
  }

  onpricingOwnerIdItemDeSelect(item: any) {
    this.updateSubmitData('pricingOwnerId', this.requestorService.getSingleSelectID(this.pricingOwnerIdSelectedItems));
  }

  onintakeRequestStatusIdItemSelect(item: any) {
    this.updateSubmitData('intakeRequestStatusId', this.requestorService.getSingleSelectID(this.intakeRequestStatusIdSelectedItems));
  }

  onintakeRequestStatusIdItemDeSelect(item: any) {
    this.updateSubmitData('intakeRequestStatusId', this.requestorService.getSingleSelectID(this.intakeRequestStatusIdSelectedItems));
  }

  ontrgtAudienceIdItemSelect(item: any) {
    this.updateSubmitData('trgtAudienceId', this.requestorService.getSingleSelectID(this.trgtAudienceIdSelectedItems));
  }

  ontrgtAudienceIdItemDeSelect(item: any) {
    this.updateSubmitData('trgtAudienceId', this.requestorService.getSingleSelectID(this.trgtAudienceIdSelectedItems));
  }

  onchannelIdsItemSelect(item: any) {
    this.updateSubmitData('channelIds', this.requestorService.getMultiSelectID(this.channelIdsSelectedItems));
  }

  onchannelIdsItemDeSelect(item: any) {
    this.updateSubmitData('channelIds', this.requestorService.getMultiSelectID(this.channelIdsSelectedItems));
  }

  onCategoryIdItemDeSelect(item: any) {
    this.updateSubmitData('categoryId', this.requestorService.getSingleSelectID(this.categoryIdSelectedItems));
  }

  onCategoryIdItemSelect(item: any) {
    this.updateSubmitData('categoryId', this.requestorService.getSingleSelectID(this.categoryIdSelectedItems));
  }

  onproductIdsItemSelect(item: any) {
    this.updateSubmitData('productIds', this.requestorService.getMultiSelectID(this.productIdsSelectedItems));
  }

  onproductIdsItemDeSelect(item: any) {
    this.updateSubmitData('productIds', this.requestorService.getMultiSelectID(this.productIdsSelectedItems));
  }

  onpriorityIdItemSelect(item: any) {
    this.updateSubmitData('priorityId', this.requestorService.getSingleSelectID(this.priorityIdSelectedItems));
  }

  onpriorityIdItemDeSelect(item: any) {
    this.updateSubmitData('priorityId', this.requestorService.getSingleSelectID(this.priorityIdSelectedItems));
  }

  onSelectAll(items: any, key: string) {
    this.updateSubmitData(key, this.requestorService.getMultiSelectID(items));
  }

  onDeSelectAll(items: any, key: string) {
    this.updateSubmitData(key, this.requestorService.getMultiSelectID(items));
  }

  convertArrayElementsToString(arrayEl) {
    let result = [];
    for (let i=0; i<arrayEl.length; i++) {
      result.push(arrayEl[i].toString());
    }
    return result;
  }

}

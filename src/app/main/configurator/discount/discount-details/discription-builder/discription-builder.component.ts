import { Component, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
  selector: 'plm-discription-builder',
  templateUrl: './discription-builder.component.html',
  styleUrls: ['./discription-builder.component.css'],
  providers: [UtilitiesService]
})
export class DiscriptionBuilderComponent implements OnInit, OnChanges {
  // @Input() masterData: any;
  // @Input() addEditDiscountSubmitData: any;

  private masterData: any;
  private addEditDiscountSubmitData: any;
  
  private singleSelectSettings = {};
  private multiSelectSettings = {};
  private discountTypeDropDownList = [];
  private discountTypeSelectedItems = [];
  private videoTiersDropDownList = [];
  private videoTiersSelectedItems = [];
  private dataTiersDropDownList = [];
  private dataTiersSelectedItems = [];
  private phoneTiersDropDownList = [];
  private phoneTiersSelectedItems = [];
  private homelifeTiersDropDownList = [];
  private homelifeTiersSelectedItems = [];
  private ancillaryFeaturesDropDownList = [];
  private ancillaryFeaturesSelectedItems = [];
  private equipmentDropDownList = [];
  private equipmentSelectedItems = [];
  private installDropDownList = [];
  private installSelectedItems = [];
  private addEditMode: boolean;
  private viewMode: boolean;
  private showDollar: boolean;
  private showPercentage: boolean;
  private showOff: boolean;

  constructor(
    private configuratorDiscountDataService: ConfiguratorDiscountDataService, 
    private utilitiesService: UtilitiesService
  ) {
    this.addEditMode = true;
    this.viewMode = false;
    this.showDollar = false;
    this.showPercentage = false;
    this.showOff = false;
    this.masterData = this.configuratorDiscountDataService.discountMasterData;
    this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
    if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
      this.updateDropDownList();
      this.updatePageMode();
      this.initializeSelectedItems();
    }
  }

  ngOnInit() {
    this.singleSelectSettings = {
      singleSelection: true,
      text: 'Select One',
      enableSearchFilter: true
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
    //   this.updateDropDownList();
    //   this.updatePageMode();
    //   this.initializeSelectedItems();
    // }
  }


  updateDropDownList() {
    this.discountTypeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'DISCOUNT_TYPE');
    this.videoTiersDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'VIDEO_TIERS');
    this.dataTiersDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'DATA_TIERS');
    this.phoneTiersDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'PHONE_TIERS');
    this.homelifeTiersDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'HOMELIFE_TIERS');
    this.ancillaryFeaturesDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'ANCILLARY');
    this.equipmentDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'EQUIPMENT');
    this.installDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'INSTALL');
    if ((typeof this.masterData !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (this.addEditDiscountSubmitData.discMapDescrBuild !== null)) {
      this.initializeSelectedItems();
    }
  }

  initializeSelectedItems() {
    this.discountTypeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'DISCOUNT_TYPE', this.addEditDiscountSubmitData.discMapDescrBuild.discountTypeId);
    this.videoTiersSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'VIDEO_TIERS', this.addEditDiscountSubmitData.discMapDescrBuild.videoTierIds);
    this.dataTiersSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'DATA_TIERS', this.addEditDiscountSubmitData.discMapDescrBuild.dataTierIds);
    this.phoneTiersSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PHONE_TIERS', this.addEditDiscountSubmitData.discMapDescrBuild.phoneTierIds);
    this.homelifeTiersSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'HOMELIFE_TIERS', this.addEditDiscountSubmitData.discMapDescrBuild.hmLifeTierIds);
    this.ancillaryFeaturesSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'ANCILLARY', this.addEditDiscountSubmitData.discMapDescrBuild.ancillaryFeatureIds);
    this.equipmentSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'EQUIPMENT', this.addEditDiscountSubmitData.discMapDescrBuild.equipmentIds);
    this.installSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'INSTALL', this.addEditDiscountSubmitData.discMapDescrBuild.installIds);
  }

  updatePageMode() {
    this.addEditMode = false;
    this.viewMode = false;
    if ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'add') || ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit'))) {
      this.addEditMode = true;
      this.viewMode = false;
    } else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'view') {
      this.addEditMode = false;
      this.viewMode = true;
    }
  }

  updateSubmitData(field, value) {
    // this.addEditDiscountSubmitData.discMapDescrBuild[field] = value;
    this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapDescrBuild[field] = value;
    this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    if (field == 'amount') {
      this.configuratorDiscountDataService.modifyDescriptionBuilderAmount(value);
    }
  }

  triggerHeaderClose() {
    // alert('Closed');
  }
  
  triggerHeaderOpen() {
    // alert('Opened');
  }
  
  onItemSelect(key: string, item: any, selectType: string) {
    this.updateSelectedVal(key, item, selectType);
}

onItemDeSelect(key: string, item: any, selectType: string) {
    this.updateSelectedVal(key, item, selectType);
}

onSelectAll(key: string, items: any, selectType: string) {
    this.updateSelectedVal(key, items, selectType);
}

onDeSelectAll(key: string, items: any, selectType: string) {
    this.updateSelectedVal(key, items, selectType);
}

updateSelectedVal(key: string, items: any, selectType: string){
    let resultVal = this.getValueBySelectType(items, selectType);
    this.updateSubmitData(key, resultVal);
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

  showTypeVal(index, objLength) {
    return ((parseInt(index)+1) === objLength);
  }

  modifyDiscountType(discountTypeSelectedItems){
    this.showDollar = false;
    this.showPercentage = false;
    this.showOff = false;
    const discountType = discountTypeSelectedItems[0].itemName;
    switch(discountType) {
      case 'Fixed Price':
        this.showDollar = true;
        break;
      case 'Dollars Off':
        this.showDollar = true;
        this.showOff = true;
        break;
      case 'Percent Off':
        this.showPercentage = true;
        this.showOff = true;
        break;
      case 'Other':
        break;
    }
  }
 
}

import { Component, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { DiscountMappingTableInterface } from '../discount-mapping-table-interface';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
    selector: 'plm-mapping-table',
    templateUrl: './mapping-table.component.html',
    styleUrls: ['./mapping-table.component.css'],
    providers: [UtilitiesService]
})
export class MappingTableComponent implements OnInit {

    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;

    private masterData: any;
    private addEditDiscountSubmitData: any;

    private addEditMode: Boolean;
    private showDownloadUrl: Boolean;
    private viewMode: Boolean;
    private singleSelectSettings = {};
    private multiSelectSettings = {};
    private offerFamilyDropDownList = [];
    private financeBucketCDDropDownList = [];
    private programNMDropDownList = [];
    private custmerTargetDownList = [];
    private discountTypeDownList = [];
    private discountSubTypeDownList = [];
    private minVideoTireDownList = [];
    private minDataTireDownList = [];
    private minPhoneTireDownList = [];
    private minHomeLifeTireDownList = [];
    private productDownList = [];
    private saTypeRequiredDownList = [];
    private installIncludedDownList = [];
    private offerFamilySelectedItems = [];
    private financeBucketCDSelectedItems = [];
    private programNMSelectedItems = [];
    private custmerTargetSelectedItems = [];
    private discountTypeSelectedItems = [];
    private discountSubTypeSelectedItems = [];
    private minVideoTireSelectedItems = [];
    private minDataTireSelectedItems = [];
    private minPhoneTireSelectedItems = [];
    private minHomeLifeTireSelectedItems = [];
    private productSelectedItems = [];
    private saTypeRequiredSelectedItems = [];
    private installIncludedSelectedItems = [];


    constructor(
        private configuratorDiscountDataService: ConfiguratorDiscountDataService,
        private utilitiesService: UtilitiesService
    ) {
        this.addEditMode = true;
        this.showDownloadUrl = false;
        this.viewMode = false;
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
        //     let change = changes[propName];
        //     if (propName === 'masterData') {
        //         this.masterData = ((typeof change.currentValue != 'undefined') && (change.currentValue != null) && (Object.keys(change.currentValue).length > 0)) ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
        //     } else if (propName === 'addEditDiscountSubmitData') {
        //         this.addEditDiscountSubmitData = ((typeof change.currentValue != 'undefined') && (change.currentValue != null) && (Object.keys(change.currentValue).length > 0)) ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
        //     }
        // }
        // if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
        //     this.updateDropDownList();
        //     this.updatePageMode();
        //     this.initializeSelectedItems();
        // }
    }


    updatePageMode() {
        if ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'add') || ((this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit'))) {
            this.addEditMode = true;
            this.showDownloadUrl = (this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit') ? true : false;
            this.viewMode = false;
        }
        else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'view') {
            this.addEditMode = false;
            this.showDownloadUrl = true;
            this.viewMode = true;
        }
    }


    updateDropDownList() {
        this.offerFamilyDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'OFFER_FAMILY');
        this.financeBucketCDDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'FINANCE_BUCKET_CD');
        this.programNMDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'PROGRAM_NM');
        this.custmerTargetDownList = this.utilitiesService.getDropDownList(this.masterData, 'CUSTOMER_TARGET');
        this.discountTypeDownList = this.utilitiesService.getDropDownList(this.masterData, 'DISCOUNT_TYPES');
        this.discountSubTypeDownList = this.utilitiesService.getDropDownList(this.masterData, 'DISCOUNT_SUB_TYPE');
        this.minVideoTireDownList = this.utilitiesService.getDropDownList(this.masterData, 'MIN_VIDEO_TIER');
        this.minDataTireDownList = this.utilitiesService.getDropDownList(this.masterData, 'MIN_DATA_TIER');
        this.minPhoneTireDownList = this.utilitiesService.getDropDownList(this.masterData, 'MIN_PHONE_TIER');
        this.minHomeLifeTireDownList = this.utilitiesService.getDropDownList(this.masterData, 'MIN_HOME_LIFE_TIER');
        this.productDownList = this.utilitiesService.getDropDownList(this.masterData, 'PRODUCT');
        this.saTypeRequiredDownList = this.utilitiesService.getDropDownList(this.masterData, 'SA_TYPE_REQUIRED');
        this.installIncludedDownList = this.utilitiesService.getDropDownList(this.masterData, 'INSTALL_INCLUDED');
        if ((typeof this.masterData !== 'undefined') && (typeof this.masterData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined')) {
            this.initializeSelectedItems();
        }
    }

    initializeSelectedItems() {
        this.offerFamilySelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'OFFER_FAMILY', this.addEditDiscountSubmitData.discMappingEntity.offerFamilyId);
        this.financeBucketCDSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'FINANCE_BUCKET_CD', this.addEditDiscountSubmitData.discMappingEntity.financeBucketCdId);
        this.programNMSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PROGRAM_NM', this.addEditDiscountSubmitData.discMappingEntity.programNmId);
        this.custmerTargetSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'CUSTOMER_TARGET', this.addEditDiscountSubmitData.discMappingEntity.customerTargetId);
        this.discountTypeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'DISCOUNT_TYPE', this.addEditDiscountSubmitData.discMappingEntity.campaignTypeId);
        this.discountSubTypeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'DISCOUNT_SUB_TYPE', this.addEditDiscountSubmitData.discMappingEntity.campaignSubTypeId);
        this.minVideoTireSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MIN_VIDEO_TIER', this.addEditDiscountSubmitData.discMappingEntity.minVideoTierId);
        this.minDataTireSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MIN_DATA_TIER', this.addEditDiscountSubmitData.discMappingEntity.minDataTierId);
        this.minPhoneTireSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MIN_PHONE_TIER', this.addEditDiscountSubmitData.discMappingEntity.minPhoneTierId);
        this.minHomeLifeTireSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MIN_HOME_LIFE_TIER', this.addEditDiscountSubmitData.discMappingEntity.minHomeLifeTierId);
        this.productSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PRODUCT', this.addEditDiscountSubmitData.discMappingEntity.productId);
        this.saTypeRequiredSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'SA_TYPE_REQUIRED', this.addEditDiscountSubmitData.discMappingEntity.saTypeRequiredId);
        this.installIncludedSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'INSTALL_INCLUDED', this.addEditDiscountSubmitData.discMappingEntity.installIncludeId);
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

    updateSubmitData(field, value) {
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discMappingEntity[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }

} 
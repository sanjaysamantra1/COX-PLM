import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
    selector: 'plm-discount-general-info',
    templateUrl: './discount-general-info.component.html',
    styleUrls: ['./discount-general-info.component.css'],
    providers: [UtilitiesService]
})
export class DiscountGeneralInfoComponent implements OnInit, OnChanges {

    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;
    
    private masterData: any;
    private addEditDiscountSubmitData: any;
    private discountDropDownList = [];
    private parentDiscountCodeDropDownList = [];
    private replacingDiscountCodeDropDownList = [];
    private projectDropDownList = [];
    private reviewBeforeExpirationStatusDropDownList = [];
    private parentDiscountCodeSelectedItems = [];
    private replacingDiscountCodeSelectedItems = [];
    private projectSelectedItems = [];
    private reviewBeforeExpirationStatusSelectedItems = [];
    private addEditMode: Boolean;
    private viewMode: Boolean;
    private singleSelectSettings = {};
    private multiSelectSettings = {};
    private salesStartMinDate: Date;
    private salesEndMinDate: Date;
    private salesCreatedMinDate: Date;
    private salesEndLastChangeMinDate: Date;
    private salesModifiedMinDate: Date;

    constructor(
        private configuratorDiscountDataService: ConfiguratorDiscountDataService,
        private utilitiesService: UtilitiesService
    ) {
        this.addEditMode = false;
        this.viewMode = false;
        console.log(this.configuratorDiscountDataService);
        this.masterData = this.configuratorDiscountDataService.discountMasterData;
        this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
        if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
            this.updateDropDownList();
            this.updatePageMode();
            this.intializeProjectDate();
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
        //     this.intializeProjectDate();
        //     this.initializeSelectedItems();
        // }
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


    intializeProjectDate() {
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        this.salesStartMinDate = new Date(todayYear, todayMonth, todayDate);
        this.salesEndMinDate = new Date(todayYear, todayMonth, todayDate);
        this.salesCreatedMinDate = new Date(todayYear, todayMonth, todayDate);
        this.salesModifiedMinDate = new Date(todayYear, todayMonth, todayDate);
        this.salesEndLastChangeMinDate = new Date(todayYear, todayMonth, todayDate);
    }

    startDateChanged(key, startDate) {
        const startDateObj = new Date(startDate);
        const endMinDate = Number(startDateObj.getDate()) + 1;
        const endMinMonth = startDateObj.getMonth();
        const endMinYear = startDateObj.getFullYear();
        this.updateSubmitData(key, startDate);
        if (key === 'startDate') {
            this.salesEndMinDate = new Date(endMinYear, endMinMonth, endMinDate);
            this.addEditDiscountSubmitData.endDate = '';
        } else if (key === 'createdDate') {
            this.salesModifiedMinDate = new Date(endMinYear, endMinMonth, endMinDate);
            this.addEditDiscountSubmitData.modifiedDate = '';
        }
    }

    updateDateInFormat(key, date){
        const dateObj = new Date(date);
        const endMinDate = Number(dateObj.getDate());
        const endMinMonth = dateObj.getMonth();
        const endMinYear = dateObj.getFullYear();
        this.updateSubmitData(key, endMinMonth+'-'+endMinDate+'-'+endMinYear );
        console.log(this.configuratorDiscountDataService.addEditDiscountSubmitData);
    }


    updateDropDownList() {
        this.parentDiscountCodeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'campaignCodesList');
        this.replacingDiscountCodeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'campaignCodesList');
        this.projectDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'PROJECT');
        this.reviewBeforeExpirationStatusDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'REVW_BFR_EXPIRATION_STATUS');
        if ((typeof this.masterData !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (this.addEditDiscountSubmitData.discMapDescrBuild !== null)) {
            this.initializeSelectedItems();
        }
    }

    initializeSelectedItems() {
        this.parentDiscountCodeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'campaignCodesList', this.addEditDiscountSubmitData.parentCampaignId);
        this.replacingDiscountCodeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'campaignCodesList', this.addEditDiscountSubmitData.replacingCampaignId);
        this.projectSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'PROJECT', this.addEditDiscountSubmitData.projectId);
        this.reviewBeforeExpirationStatusSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'REVW_BFR_EXPIRATION_STATUS', this.addEditDiscountSubmitData.reviewBeforeExpirationStatusId);
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

    convertTextAreaContentWithBreaks(field, value) {
        this.updateSubmitData(field, JSON.stringify(value));
    }

    updateSubmitData(field, value) {
        this.configuratorDiscountDataService.addEditDiscountSubmitData[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }

}

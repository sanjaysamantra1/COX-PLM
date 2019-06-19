import { Component, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import {  DiscMapOscar } from '../discount-interface';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
    selector: 'plm-oscar',
    templateUrl: './oscar.component.html',
    styleUrls: ['./oscar.component.css'],
    providers: [UtilitiesService]
})
export class OscarComponent implements OnInit, OnChanges {

    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;

    private masterData: any;
    private addEditDiscountSubmitData: any;

    private addEditMode: Boolean;
    private viewMode: Boolean;
    private singleSelectSettings = {};
    private multiSelectSettings = {};
    private oscarStatusDropDownList = [];
    private financeBucketProgramCodeDropDownList = [];
    private marketingIDDropDownList = [];
    private oscarStatusSelectedItems = [];
    private financeBucketProgramCodeSelectedItems = [];
    private marketingIDSelectedItems = [];

    constructor(
        private configuratorDiscountDataService: ConfiguratorDiscountDataService,
        private utilitiesService: UtilitiesService
    ) {
        this.addEditMode = true;
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
            this.viewMode = false;
        }
        else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'view') {
            this.addEditMode = false;
            this.viewMode = true;
        }
    }

    updateDropDownList() {
        this.oscarStatusDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'OSCAR_STATUS');
        this.financeBucketProgramCodeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'FINANCE_BUCKET_PROG_CD');
        this.marketingIDDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MARKETING_ID');
        if ((typeof this.masterData !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (this.addEditDiscountSubmitData.discMapDescrBuild !== null)) {
            this.initializeSelectedItems();
        }
    }

    initializeSelectedItems() {
        this.oscarStatusSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'OSCAR_STATUS', this.addEditDiscountSubmitData.discMapOscar.oscarId);
        this.financeBucketProgramCodeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'FINANCE_BUCKET_PROG_CD', this.addEditDiscountSubmitData.discMapOscar.financeBucketProgCdId);
        this.marketingIDSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MARKETING_ID', this.addEditDiscountSubmitData.discMapOscar.mrktId);
        
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
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapOscar[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }

}

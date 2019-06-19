import { Component, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
    selector: 'plm-gift-card',
    templateUrl: './gift-card.component.html',
    styleUrls: ['./gift-card.component.css'],
    providers: [UtilitiesService]
})
export class GiftCardComponent implements OnInit, OnChanges {

    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;

    private masterData: any;
    private addEditDiscountSubmitData: any;

    private addEditMode: Boolean;
    private viewMode: Boolean;
    private giftValidationStatusDropDownList = [];
    private giftValidationStatusSelectedItems = [];
    private singleSelectSettings = {};
    private multiSelectSettings = {};

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


    updateDropDownList() {
        this.giftValidationStatusDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'GIFT_VALIDATION_STATUS');
        if ((typeof this.masterData !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (this.addEditDiscountSubmitData.discMapDescrBuild !== null)) {
            this.initializeSelectedItems();
        }
    }

    initializeSelectedItems() {
        this.giftValidationStatusSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'GIFT_VALIDATION_STATUS', this.addEditDiscountSubmitData.discountGift.validationStatusId);
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

    convertTextAreaContentWithBreaks(field, value) {
        this.updateSubmitData(field, JSON.stringify(value));
    }

    updateSubmitData(field, value) {
        // this.addEditDiscountSubmitData.discountGift[field] = value;
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discountGift[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }

}

import { Component, OnInit, OnChanges, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
    selector: 'plm-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
    providers: [UtilitiesService]
})
export class MainPageComponent implements OnInit, OnChanges {

    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;

    private masterData: any;
    private addEditDiscountSubmitData: any;

    private isAllChannelsSelected: Boolean;
    private channelsSelected: Boolean;
    private selectChannel: Object;
    private isSelectAllChannel: Boolean;
    private channels: string[];
    private isAllTacticsSelected: Boolean;
    private tacticsSelected: Boolean;
    private selectTactics: Object;
    private isSelectAllTactics: Boolean;
    private tactics: string[];
    private addEditMode: Boolean;
    private viewMode: Boolean;
    private mpNewDropDownList = [];
    private mpNewSelectedItems = [];
    private mpOfferProductDropDownList = [];
    private mpOfferProductSelectedItems = [];
    private mpOfferTypeDropDownList = [];
    private mpOfferTypeSelectedItems = [];
    private mpTargetAudienceDropDownList = [];
    private mpTargetAudienceSelectedItems = [];
    private mpInstallationDropDownList = [];
    private mpInstallationSelectedItems = [];
    private singleSelectSettings = {};
    private multiSelectSettings = {};

    constructor(
        private configuratorDiscountDataService: ConfiguratorDiscountDataService,
        private utilitiesService: UtilitiesService
    ) {
        this.isAllChannelsSelected = false;
        this.channelsSelected = true;
        this.selectChannel = {};
        this.isSelectAllChannel = false;
        this.isAllTacticsSelected = false;
        this.tacticsSelected = true;
        this.selectTactics = {};
        this.isSelectAllTactics = false;
        this.addEditMode = true;
        this.viewMode = false;
        this.channels = [];
        this.tactics = [];
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
        this.mpNewDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MP_NEW_EXISTING');
        this.mpOfferProductDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MP_OFFER_PRODUCT');
        this.mpOfferTypeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MP_OFFER_TYPE');
        this.mpTargetAudienceDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MP_TARGETED_AUDIENCE');
        this.mpInstallationDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'MP_INSTALLATION_TPR');
        this.channels = this.addEditDiscountSubmitData.discMapMainPage.channelIds;
        this.tactics = this.addEditDiscountSubmitData.discMapMainPage.tacticIds;
        // if ((typeof this.masterData !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (this.addEditDiscountSubmitData.discMapDescrBuild !== null)) {
            this.initializeSelectedItems();
        // }
    }

    initializeSelectedItems() {
        this.mpNewSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MP_NEW_EXISTING', this.addEditDiscountSubmitData.discMapMainPage.mpNewExistingId);
        this.mpOfferProductSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MP_OFFER_PRODUCT', this.addEditDiscountSubmitData.discMapMainPage.mpOfferProductId);
        this.mpOfferTypeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MP_OFFER_TYPE', this.addEditDiscountSubmitData.discMapMainPage.mpOfferTypeId);
        this.mpTargetAudienceSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MP_TARGETED_AUDIENCE', this.addEditDiscountSubmitData.discMapMainPage.mpTargetedAudienceId);
        this.mpInstallationSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'MP_INSTALLATION_TPR', this.addEditDiscountSubmitData.discMapMainPage.mpInstallationTprId);
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
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapMainPage[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }

    isAllChanelsSelectedCheck() {
        const marketSitesLength = Object.keys(this.masterData.MP_CHANNELS).length;
        if ((this.channels) && (this.channels.length > 0) && (this.channels.length === marketSitesLength)) {
            this.isSelectAllChannel = true;
            return true;
        } else {
            this.isSelectAllChannel = false;
            return false;
        }
    }

    isChannelExist(channel, index) {
        if ((this.channels) && (this.channels.length > 0) && (this.channels.indexOf(channel) > -1)) {
            this.selectChannel[index] = true;
            return true;
        } else {
            return false;
        }
    }

    selectAllChannels(selectedAll) {
        if (selectedAll) {
            for (let i = 0; i < this.masterData.MP_CHANNELS.length; i++) {
                this.channels.push(this.masterData.MP_CHANNELS[i]['key']);
            }
            this.isSelectAllChannel = true;
        } else {
            this.channels = [];
            this.isSelectAllChannel = false;
        }
        this.updateSubmitData('channelIds', this.channels);
    }

    addChannel(selectChannel, channelValue) {
        if (selectChannel) {
            this.channels.push(channelValue);
        } else {
            this.channels.splice(this.channels.indexOf(channelValue), 1);
        }
        this.updateSubmitData('channelIds', this.channels);
    }


    isAllTacticsSelectedCheck() {
        const marketSitesLength = Object.keys(this.masterData.MP_TACTICS).length;
        if ((this.tactics) && (this.tactics.length > 0) && (this.tactics.length === marketSitesLength)) {
            this.isSelectAllTactics = true;
            return true;
        } else {
            this.isSelectAllTactics = false;
            return false;
        }
    }

    isTacticsExist(tactics, index) {
        if ((this.tactics) && (this.tactics.length > 0) && (this.tactics.indexOf(tactics) > -1)) {
            setTimeout(() => { this.selectTactics[index] = true; }, 0)
            return true;
        } else {
            return false;
        }
    }

    selectAllTactics(selectedAll) {
        if (selectedAll) {
            for (let i = 0; i < this.masterData.MP_TACTICS.length; i++) {
                this.tactics.push(this.masterData.MP_TACTICS[i]['key']);
            }
            this.isAllTacticsSelected = true;
        } else {
            this.tactics = [];
            this.isAllTacticsSelected = false;
        }
        this.updateSubmitData('tacticIds', this.tactics);
    }

    addTactics(selectTactics, tacticsValue) {
        if (selectTactics) {
            this.tactics.push(tacticsValue);
        } else {
            this.tactics.splice(this.tactics.indexOf(tacticsValue), 1);
        }
        this.updateSubmitData('tacticIds', this.tactics);
    }

}

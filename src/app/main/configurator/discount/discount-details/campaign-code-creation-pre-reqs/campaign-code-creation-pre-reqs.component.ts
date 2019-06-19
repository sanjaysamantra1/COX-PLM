import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import {
    GetCampaignCodePricingPreReq, GetCampaignCodePricingPreReqResponse,
    DiscMapPreRequisite, TeCode
} from '../discount-interface';
import { DiscountFormDropDown, GetDiscountGeneralInformation } from '../discount-interface';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';
import { DiscountCampaignCodePreReqInterface } from '../discount-campaign-code-pre-req-interface';
import { DiscountService } from '../discount.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { AppConfigService } from '../../../../../shared/services/app-config.service';

@Component({
    selector: 'plm-campaign-code-creation-pre-reqs',
    templateUrl: './campaign-code-creation-pre-reqs.component.html',
    styleUrls: ['./campaign-code-creation-pre-reqs.component.css'],
    providers: [UtilitiesService]
})
export class CampaignCodeCreationPreReqsComponent implements OnInit {
    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;
    // @Input() campaignCodeMethodPreReq: GetCampaignCodePricingPreReq;
    // @Input() teData: TeCode;
    // @Input() discountFormDropDown: DiscountFormDropDown;
    @Output() fileUpload: EventEmitter<any> = new EventEmitter<any>();

    private masterData: any;
    private addEditDiscountSubmitData: any;
    private discMapPreRequisite: DiscMapPreRequisite;
    private showDiscountAddForm: Boolean;
    private tecodeDropDownList = [];
    private codeDropDownList = [];
    private parentDiscountCodeSelectedItems = [];
    private replacingDiscountCodeSelectedItems = [];
    private descriptionDropDownList = [];
    private ownerDropDownList = [];
    private addEditMode: Boolean;
    private showDownloadUrl: Boolean;
    private viewMode: Boolean;
    private formDataLoaded: Boolean;
    private selectSite: Object;
    private teCodeDropDownList = [];
    private teCodeSelectedItems = [];
    private codeSelectedItems = [];
    private tecodeSelectedItems = [];
    private descriptionSelectedItems = [];
    private ownerSelectedItems = [];
    private singleSelectSettings = {};
    private multiSelectSettings = {};
    private fileSizeExceeded: Boolean;
    private fileToUpload: File = null;
    private downloadFileUrl: string;
    private teCodeList: any;


    constructor(private appConfigService: AppConfigService, private utilitiesService: UtilitiesService, private configuratorDataService: ConfiguratorDataService, private discountService: DiscountService, private configuratorDiscountDataService: ConfiguratorDiscountDataService) {
        this.intializeDiscMapPreRequisite();
        this.showDiscountAddForm = false;
        this.addEditMode = true;
        this.showDownloadUrl = false;
        this.viewMode = false;
        this.formDataLoaded = false;
        this.fileSizeExceeded = false;
        this.downloadFileUrl = '';
        this.teCodeList = [];
        this.masterData = this.configuratorDiscountDataService.discountMasterData;
        this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
        if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
            this.updateDropDownList();
            this.updatePageMode();
            this.initializeSelectedItems();
            this.initializeTECodes();
        }
    }

    ngOnInit() {
        this.singleSelectSettings = {
            singleSelection: true,
            text: 'Select One',
            maxHeight: 120,
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


    convertTextAreaContentWithBreaks(field, value) {
        this.updateSubmitData(field, JSON.stringify(value));
    }

    updateSubmitData(field, value) {
        // this.addEditDiscountSubmitData.discMapPreRequisite[field] = value;
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPreRequisite[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
    }


    updateDropDownList() {
        this.tecodeDropDownList = this.getTECodeDropDownList(this.masterData, 'teCodeResponse');
        // this.codeDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'code');
        // this.descriptionDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'description');
        // this.ownerDropDownList = this.utilitiesService.getDropDownList(this.masterData, 'owner');
        if ((typeof this.masterData !== 'undefined') && (typeof this.masterData !== 'undefined') && (typeof this.configuratorDiscountDataService.addEditViewDiscountMode !== 'undefined') && (typeof this.addEditDiscountSubmitData !== 'undefined')) {
            this.initializeSelectedItems();
        }
    }

    initializeSelectedItems() {
        this.tecodeSelectedItems = this.getTECodeSelectedItemsObject(this.masterData, 'teCodeResponse', this.addEditDiscountSubmitData.discMapPreRequisite.teCode);
        // this.codeSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'code', this.addEditDiscountSubmitData.discMapPreRequisite.code);
        // this.descriptionSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'description', this.addEditDiscountSubmitData.discMapPreRequisite.description);
        // this.ownerSelectedItems = this.utilitiesService.getSelectedItemsObject(this.masterData, 'owner', this.addEditDiscountSubmitData.discMapPreRequisite.owner);
        this.downloadFileUrl = this.appConfigService.url + 'http://localhost:8180/plm-engine/configurator/v0/discount/file/' + this.addEditDiscountSubmitData.discMapPreRequisite.preReqId;
    }

    initializeTECodes() {
        if ((typeof this.addEditDiscountSubmitData !== 'undefined') && (this.addEditDiscountSubmitData !== null) && (Object.keys(this.addEditDiscountSubmitData).length > 0)) {
            if (this.addEditDiscountSubmitData.discMapPreRequisite.teCodes.length > 0) {
                for (let i=0; i<this.addEditDiscountSubmitData.discMapPreRequisite.teCodes.length; i++) {
                    let tecodeSelectedItems = this.getTECodeSelectedItemsObject(this.masterData, 'teCodeResponse', this.addEditDiscountSubmitData.discMapPreRequisite.teCodes[i]);
                    let teCodeObj = this.getTECodeObj(this.addEditDiscountSubmitData.discMapPreRequisite.teCodes[i]);
                    this.teCodeList.push({
                        'teCodeId': this.addEditDiscountSubmitData.discMapPreRequisite.teCodes[i],
                        'teCodeDropDownList': this.tecodeDropDownList,
                        'tecodeSelectedItems' : tecodeSelectedItems,
                        'teCodeDescription': teCodeObj.description,
                        'teCodeOwnerName': teCodeObj.owner
                    });
                }
            } else {
                this.teCodeList.push({
                    'teCodeId': 0,
                    'teCodeDropDownList': this.tecodeDropDownList,
                    'tecodeSelectedItems' : [],
                    'teCodeDescription': '',
                    'teCodeOwnerName': ''
                });
            }
        }
    }


    getTECodeDropDownList(masterData, dropDownKey) {
        let result = [];
        for (let i = 0; i < masterData[dropDownKey].length; i++) {
            let itemNameValue =  masterData[dropDownKey][i]['code'] + ' - ' +
                masterData[dropDownKey][i]['description'] + ' - ' +
                masterData[dropDownKey][i]['type'];
            result.push({
                "id": masterData[dropDownKey][i]['teCodeId'],
                "itemName": itemNameValue
            });
        }
        return result;
    }


    getTECodeSelectedItemsObject(masterData, dropDownKey, dropDownList) {
        let result = [];
        for (let i = 0; i < masterData[dropDownKey].length; i++) {
            let itemNameValue =  masterData[dropDownKey][i]['code'] + ' - ' +
                    masterData[dropDownKey][i]['description'] + ' - ' +
                    masterData[dropDownKey][i]['type'];
            if ((dropDownList instanceof Array) && (dropDownList.length > 0) && (dropDownList.indexOf(masterData[dropDownKey][i]['teCodeId']) > -1)) {
                result.push({
                    "id": masterData[dropDownKey][i]['teCodeId'],
                    "itemName": itemNameValue
                });
            } else if (masterData[dropDownKey][i]['teCodeId'] == dropDownList) {
                result.push({
                    "id": masterData[dropDownKey][i]['teCodeId'],
                    "itemName": itemNameValue
                });
            }
        }
        return result;
    }

    getTECodeObj(teCodeID){
        let result: any;
        for (let i=0; i<this.masterData.teCodeResponse.length; i++) {
            if (this.masterData.teCodeResponse[i].teCodeId == teCodeID) {
                result = this.masterData.teCodeResponse[i];
                break;
            }
        }
        return result;
    }

    updateTECodeValue(key, index, selectedValue){
        console.log(selectedValue);
        console.log(index);
        this.configuratorDiscountDataService.teCodes = this.getTECodesList();
        this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPreRequisite.teCodes = this.getTECodesList();
        let teCodeObj = this.getTECodeObj(selectedValue[0]['id']);
        console.log(teCodeObj);
        let tecodeSelectedItems = this.getTECodeSelectedItemsObject(this.masterData, 'teCodeResponse', selectedValue[0]['id']);
        this.teCodeList[index] = {
            'teCodeId': selectedValue[0]['id'],
            'teCodeDropDownList': this.tecodeDropDownList,
            'tecodeSelectedItems' : tecodeSelectedItems,
            'teCodeDescription': teCodeObj.description,
            'teCodeOwnerName': teCodeObj.owner
        }
        console.log(this.configuratorDiscountDataService.addEditDiscountSubmitData.discMapPreRequisite.teCodes);
        if (index == Number(this.teCodeList.length)-1) {
            this.teCodeList.push({
                'teCodeId': 0,
                'teCodeDropDownList': this.tecodeDropDownList,
                'tecodeSelectedItems' : [],
                'teCodeDescription': '',
                'teCodeOwnerName': ''
            });
        }
    }

    getTECodesList() {
        let result = [];
        for (let i=0; i<this.teCodeList.length; i++) {
            if (this.teCodeList[i].teCodeId != 0) {
                result.push(this.teCodeList[i].teCodeId);
            }
        }
        return result;
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

    updateSelectedVal(key: string, items: any, selectType: string) {
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


    handleFileInput(files: FileList, event: any) {
        this.fileSizeExceeded = false;
        this.fileToUpload = files.item(0);
        const fileSizeInMB = (this.fileToUpload.size / (1024 * 1024)).toFixed(2);
        if (parseFloat(fileSizeInMB) > parseFloat(Number(20).toFixed(2))) {
            event.target.value = null;
            this.fileSizeExceeded = true;
            return false;
        }
        this.updateSubmitData('preReqOfferTemplate', JSON.stringify(this.fileToUpload));
        this.fileUpload.emit(this.fileToUpload);
    }



    intializeDiscMapPreRequisite() {
        this.discMapPreRequisite = {

            'preReqId': '',
            'cmpgnCdAIncIfOne': '',
            'cmpgnCdDExcIfAny': '',
            'cmpgnCdNumOfDays': '',
            'cmpgnLongDescr': '',
            'curntSrvcAIncIfOne': '',
            'curntSrvcBIncIfAll': '',
            'curntSrvcCIncIfAtlst': '',
            'curntSrvcCOfThese': '',
            'curntSrvcDExcIfAny': '',
            'curntSrvcEExcIfAll': '',
            'curntSrvcFExcIfAtlst': '',
            'curntSrvcFOfThese': '',
            'icomsAccessList1': '',
            'icomsAccessList2': '',
            'icomsAccessList3': '',
            'icomsAccessList4': '',
            'icomsAccessList5': '',
            'icomsAccessList6': '',
            'instlSrvcAIncIfOne': '',
            'instlSrvcBIncIfAll': '',
            'instlSrvcCIncIfAtlst': '',
            'instlSrvcCOfThese': '',
            'instlSrvcDExcIfAny': '',
            'instlSrvcEExcIfAll': '',
            'instlSrvcFExcIfAtlst': '',
            'instlSrvcFOfThese': '',
            'mrktIdAIncIfOne': '',
            'mrktIdDExcIfAny': '',
            'otherInsrct': '',
            'plgInstlAIncIfOne': '',
            'plgInstlBIncIfAll': '',
            'plgInstlDExcIfAny': '',
            'plgRetnAIncIfOne': '',
            'plgRetnDExcIfAny': '',
            'retnSrvcAIncIfOne': '',
            'retnSrvcBIncIfAll': '',
            'retnSrvcCIncIfAtlst': '',
            'retnSrvcCOfThese': '',
            'retnSrvcDExcIfAny': '',
            'retnSrvcEExcIfAll': '',
            'retnSrvcFExcIfAtlst': '',
            'retnSrvcFOfThese': '',
            'discountId': '',
            'preReqIcomsDataBlobs': '',
            'teCodeId': '',
            'teCode': '',
            'teCodeDescription': '',
            'teCodeOwner': '',
            'uploadteCodeDocId': '',
            'TECODERESPONSE': [],

        };
    }
}

import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { DiscountService } from '../discount.service';
import { ConfiguratorDiscountDataService } from '../../services/configurator-discount-data.service';
import { DiscountSitesInterface } from '../discount-sites-interface';



@Component({
    selector: 'plm-discount-sites',
    templateUrl: './discount-sites.component.html',
    styleUrls: ['./discount-sites.component.css']
})
export class DiscountSitesComponent implements OnInit, OnChanges {
    // @Input() masterData: any;
    // @Input() addEditDiscountSubmitData: any;

    private masterData: any;
    private addEditDiscountSubmitData: any;

    private isSelectAll: boolean;
    private isAllSitesSelected: boolean;
    private sitesSelected: boolean;
    private selectSite: object;
    private selectedAll: boolean;
    private sites: number[];
    private addEditMode: boolean;
    private viewMode: boolean;
    private formLoaded: boolean;

    constructor(
        private discountService: DiscountService, 
        private configuratorDiscountDataService: ConfiguratorDiscountDataService
    ) {
        this.selectedAll = false;
        this.sites = [];
        this.selectSite = [];
        this.addEditMode = true;
        this.viewMode = false;
        this.formLoaded = false;
        this.masterData = this.configuratorDiscountDataService.discountMasterData;
        this.addEditDiscountSubmitData = this.configuratorDiscountDataService.addEditDiscountSubmitData;
        if ((typeof this.masterData != 'undefined') && (this.masterData != null) && (Object.keys(this.masterData).length > 0)) {
            this.updatePageMode();
            console.log(this.addEditDiscountSubmitData);
            this.sites = this.addEditDiscountSubmitData.sites;
        }
    }

    ngOnInit() {
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
        //     this.formLoaded = true;
        //     this.updatePageMode();
        //     this.sites = this.addEditDiscountSubmitData.sites;
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
        this.formLoaded = true;
    }

    isAllSitesSelectedCheck() {
        const marketSitesLength = Object.keys(this.masterData.MARKETS).length;
        if (this.sites.length === marketSitesLength) {
            this.isSelectAll = true;
            return true;
        } else {
            this.isSelectAll = false;
            return false;
        }
    }

    isSitesExist(site, index) {
        // console.log(this.sites+' <--> '+site);
        if (this.sites.indexOf(site) > -1) {
            this.selectSite[index] = true;
            return true;
        } else {
            return false;
        }
    }

    selectAllSites(selectedAll) {
        if (selectedAll) {
            for (let i = 0; i < this.masterData.MARKETS.length; i++) {
                this.sites.push(this.masterData.MARKETS[i]['key']);
            }
            this.isSelectAll = true;
        } else {
            this.sites = [];
            this.isSelectAll = false;
        }
        this.updateSubmitData('sites', this.sites);
    }

    sitesToString() {
        let sites = [];
        for (let i = 0; i < this.sites.length; i++) {
            sites.push(this.sites[i].toString());
        }
        return sites;
    }

    addSite(selectSite, siteValue) {
        if (selectSite) {
            this.sites.push(siteValue);
        } else {
            this.sites.splice(this.sites.indexOf(siteValue), 1);
        }
        this.updateSubmitData('sites', this.sites);
        console.log(this.sites);
    }

    updateSubmitData(field, value) {
        this.configuratorDiscountDataService.addEditDiscountSubmitData[field] = value;
        this.configuratorDiscountDataService.isAddEditDiscountModified = true;
        this.configuratorDiscountDataService.modifyMarketList(value);
    }

}

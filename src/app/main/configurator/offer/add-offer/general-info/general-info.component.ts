import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { OfferFormDropDown, GetGeneralInfoInterfaceResponse } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import {
    RequestorResponseInterface,
    RequestorRequestInterface,
    IntakeFormReq,
    AddUpdateProjectResponse
} from '../../../../requestor/requestor.interface';
import { ConfiguratorDataService } from '../../../configurator-data.service';


@Component({
    selector: 'plm-general-info',
    templateUrl: './general-info.component.html'
})
export class GeneralInfoComponent implements OnInit, OnChanges {

    @Input() offerFormDropDown: OfferFormDropDown;
    @Input() offerGeneralInfo: GetGeneralInfoInterfaceResponse;

    public formData: any;
    private selectedAll: Boolean;
    private sites: number[];
    private isSelectAll: Boolean;
    private selectSite: Boolean[];

    constructor(private configuratorDataService: ConfiguratorDataService) {
        this.selectedAll = false;
        this.isSelectAll = false;
        this.sites = [];
        this.formData = {};
        this.selectSite = [];
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];
            if (propName === 'offerFormDropDown') {
                if ((typeof change.currentValue != 'undefined') && (typeof change.currentValue.MARKETS != 'undefined')) {
                    this.formData.MARKETS =  change.currentValue.MARKETS;
                }
            } else if (propName === 'offerGeneralInfo') {
                this.offerGeneralInfo = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
                for (let i=0; i < this.offerGeneralInfo.sites.length; i++) {
                    setTimeout(()=>{this.sites.push(this.offerGeneralInfo.sites[i]);},0);
                }
            }
        }
    }


    isAllSitesSelectedCheck() {
        const marketSitesLength = Object.keys(this.offerFormDropDown.MARKETS).length;
        if (this.sites.length === marketSitesLength) {
            this.isSelectAll = true;
            return true;
        } else {
            this.isSelectAll = false;
            return false;
        }
    }

    isSitesExist(site, index) {
        if (this.sites.indexOf(site) > -1) {
            setTimeout(()=>{this.selectSite[index] = true;},0)
            return true;
        } else {
            return false;
        }
    }

    selectAllSites(selectedAll) {
        if (selectedAll) {
            for (let i=0; i<this.offerFormDropDown.MARKETS.length; i++) {
                this.sites.push(this.offerFormDropDown.MARKETS[i]['key']);
            }
            this.isSelectAll = true;
        } else {
            this.sites = [];
            this.isSelectAll = false;
        }
        this.updateSubmitData('sites', this.sites);
    }

    addSite(selectSite, siteValue) {
        if (selectSite) {
            this.sites.push(siteValue);
        } else {
            this.sites.splice(this.sites.indexOf(siteValue), 1);
        }
        this.updateSubmitData('sites', this.sites);
    }

    updateSubmitData(field, value) {
        this.configuratorDataService.configuratorOfferModel.offerModel.generalInfoMapTxnDet[field] = value;
    }
}

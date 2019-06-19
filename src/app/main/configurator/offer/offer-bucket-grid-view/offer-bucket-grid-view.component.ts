import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { GetConfiguratorExistingPsu, GetConfiguratorExistingResponse, CreatePsu, PSUProduct, Specifications,CreateOffers,GetOfferUnderProjects } from './offer-bucket-grid-vew-interface';
import { OfferBucketGridVewService } from './offer-bucket-grid-vew.service';
import { ConfiguratorDataService } from '../../configurator-data.service';

@Component({
  selector: 'plm-offer-bucket-grid-view',
  templateUrl: './offer-bucket-grid-view.component.html',
  providers: [OfferBucketGridVewService]
})
export class OfferBucketGridViewComponent implements OnInit {

  private offersList: CreateOffers[];
  private getConfiguratorUnderProject: GetOfferUnderProjects[];
  private key: string;
  private reverse: boolean;
  private showSearch: boolean;
  
  private getConfiguratorExistingPsu: GetConfiguratorExistingResponse;

  constructor(private OfferBucketGridViewService:OfferBucketGridVewService, private router: Router, private configuratorDataService: ConfiguratorDataService){
    
    this.offersList= [];
    this.configuratorDataService.offerIDToModify = '';
    this.configuratorDataService.isModifyOffer = false;
    this.configuratorDataService.marketingOfferIDToAddOffer = '';
    this.configuratorDataService.isAddoffer = false;
  }

  ngOnInit() {
    this.getConfiguratorGridList();
  }

  getConfiguratorGridList(){
    this.OfferBucketGridViewService.getConfiguratorGridList()
        .subscribe(
            data => {
                this.getConfiguratorUnderProject = data.offersUnderProject;
                this.offersList = data.offers;
            },
            error => {
                console.log("Error :: " + error)
            }
        );
  }

  moveToAddOffer(){
    this.router.navigate(['/plm-work-flow/configurator/offer/add-offer']);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleSearchIcon(){
    this.showSearch = !this.showSearch;
  }

}

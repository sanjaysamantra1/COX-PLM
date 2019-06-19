import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GetConfiguratorExistingPsu, GetConfiguratorExistingResponse, CreatePsu, PSUProduct, Specifications,CreateOffers } from '../offer-bucket-grid-vew-interface';
import { OfferBucketGridVewService } from '../offer-bucket-grid-vew.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-offer-bucket',
  templateUrl: './offer-bucket.component.html'
})
export class OfferBucketComponent implements OnInit {

  @Input() projectCode: string;
  @Input() psu: CreatePsu;
  @Input() offersList: CreateOffers;
  @Input() psuType: string;
  @Input() psuCount: number;
  private isDataProduct: boolean;
  private dataProductVal: string;
  private isVideoProduct: boolean;
  private videoProductVal: string;
  private isPhoneProduct: boolean;
  private phoneProductVal: string;
  private isHomeProduct: boolean;
  private homeProductVal: string;
  private selected: string[];
  private productsArray: string[];
  private noDataArray: string[];

  constructor(private router: Router, private configuratorDataService: ConfiguratorDataService) {
    this.isDataProduct = false;
    this.isPhoneProduct = false;
    this.isVideoProduct = false;
    this.isHomeProduct = false;
    this.productsArray = [];
    this.noDataArray = [];
   }

  ngOnInit() {
    const products = this.psu.productResponse;
    for (let i=0; i<products.length; i++) {
      this.productsArray.push(products[i].psuName);
      this.showProducts(products[i]);
    }    
    this.selected = this.productsArray;
    for (let j=0; j<this.psuCount; j++) {
      this.noDataArray.push("No Data");
    }
  }

  showProducts(product) {
    if (product.psuName.toLowerCase() === 'data') {
      this.isDataProduct = true;
      this.dataProductVal = product.description;
    } else if (product.psuName.toLowerCase() === 'phone') {
      this.isPhoneProduct = true;
      this.phoneProductVal = product.description;
    } else if (product.psuName.toLowerCase() === 'video') {
      this.isVideoProduct = true;
      this.videoProductVal = product.description;
    } else if (product.psuName.toLowerCase() === 'homelife') {
      this.isHomeProduct = true;
      this.homeProductVal = product.description;
    } else {
    }
  }

  goToAddOffer() {
    this.configuratorDataService.marketingOfferIDToAddOffer = this.psu.marketingOfferID;
    this.configuratorDataService.isAddoffer = true;
    this.router.navigate(['/plm-work-flow/configurator/offer/add-offer']);
  }
  
  goToModifyOffer() {
    this.configuratorDataService.offerIDToModify = this.psu.offerId;
    this.configuratorDataService.isModifyOffer = true;
    this.router.navigate(['/plm-work-flow/configurator/offer/add-offer']);
  }

}

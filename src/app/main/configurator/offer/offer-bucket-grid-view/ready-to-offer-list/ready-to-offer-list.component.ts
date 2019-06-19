import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GetConfiguratorExistingPsu, GetConfiguratorExistingResponse, CreatePsu, PSUProduct, Specifications,CreateOffers } from '../offer-bucket-grid-vew-interface';
import { OfferBucketGridVewService } from '../offer-bucket-grid-vew.service';
import { Router } from '@angular/router';

@Component({
  selector: 'plm-ready-to-offer-list',
  templateUrl: './ready-to-offer-list.component.html'
})
export class ReadyToOfferListComponent implements OnInit, OnChanges {

  @Input() offersListChild: CreateOffers[];
  private offerList: Boolean[];
  private projectCode: string;
  private offerListForRelease: number[];
  private noOfferSelectedForRelease: boolean;
  
  constructor(private router: Router, private offerBucketGridVewService: OfferBucketGridVewService) {
    this.offerList = [];
    this.projectCode = '';
    this.offerListForRelease = [];
    this.noOfferSelectedForRelease = false;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offersListChild') {
          this.offersListChild = (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : [];
          for (let i=0; i< this.offersListChild.length; i++) {
            this.offerList[i] = false;
          }
          this.projectCode = (this.offersListChild.length > 0 ) ? (this.offersListChild[0].projectCode) : '';
      }
    }
  }

  updateOfferForRelease(isChecked, offerID){
    if (isChecked) {
      this.offerListForRelease.push(offerID);
    } else {
      this.offerListForRelease.splice(this.offerListForRelease.indexOf(offerID), 1);
    }
    this.showHideReleaseForDistributionButton();
  }


  showHideReleaseForDistributionButton(){
    if (this.offerListForRelease.length > 0) {
      this.noOfferSelectedForRelease = true;
    } else {
      this.noOfferSelectedForRelease = false;
    }
  }

  releaseOffersForDistribution(){
    const reqObj = {
      'projectCode': this.projectCode,
      'offersList': this.offerListForRelease
    }
    this.offerBucketGridVewService.submitOfferForRelease(reqObj)
        .subscribe(
            data => {
            },
            error => {
                console.log("Error :: " + error)
            }
        );
  }

  returnBack() {
    this.router.navigate(['plm-work-flow/configurator/offer/project-list']);
  }

}

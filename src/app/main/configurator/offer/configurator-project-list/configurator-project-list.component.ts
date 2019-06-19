import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguratorProjectListService } from './configurator-project-list.service';
import { OfferBucketGridVewService } from '../offer-bucket-grid-view/offer-bucket-grid-vew.service';
import { ConfiguratorDataService } from '../../configurator-data.service';
import { Project } from '../../configurator.interface';

@Component({
  selector: 'plm-configurator-project-list',
  templateUrl: './configurator-project-list.component.html',
  providers: [ConfiguratorProjectListService, OfferBucketGridVewService]
})
export class ConfiguratorProjectListComponent implements OnInit {
  private filterByCode: string;
  private filterByType: string;
  private filterPricingOwner: string;
  private filterByDescription: string;
  private filterByResqustorName: string;
  private filterByCreatedDate: string;
  private showSearch: boolean;
  private key: string;
  private reverse: boolean;

  private configuratorProjectList: Project[];
  private offerBucketGridVewService : OfferBucketGridVewService;

  constructor(private createMarketingOfferService:ConfiguratorProjectListService, private router: Router, offerBucketGridVewService : OfferBucketGridVewService, private configuratorDataService: ConfiguratorDataService){
    this.getConfiguratorProjectList();
    this.offerBucketGridVewService = offerBucketGridVewService;
  }

  ngOnInit() {
    this.filterByCode = '';
    this.filterByType = '';
    this.filterPricingOwner= '';
    this.filterByDescription= '';
    this.filterByResqustorName= '';
    this.filterByCreatedDate= '';

  }
  
  getConfiguratorProjectList(){
    this.createMarketingOfferService.getConfiguratorProjectList()
        .subscribe(
            data => {
                this.configuratorProjectList = data;
            },
            error => {
                console.log("Error :: " + error)
            }
        );
  }

  getDateInFormat(date) {
    const currentDate = new Date(date);
    const result = ("0" + (currentDate.getDate() + 1)).slice(-2) + '/' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '/' + currentDate.getFullYear();
    return result;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleSearchIcon(){
    this.showSearch = !this.showSearch;
  }

  moveToConfiguratorGrid(projectCode) {
    this.configuratorDataService.configuratorProjectCode = projectCode;
    this.router.navigate(['/plm-work-flow/configurator/offer/offer-table']);
  }


returnBack() {
    this.router.navigate(['']);
  }

}

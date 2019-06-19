import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IntakeRequestMasterData, FetchAllIntakeRequest } from '../../../requestor/requestor.interface';
import { RequestorService } from '../../../requestor/services/requestor.service';
import { GetDiscountProjectList, GetDiscountProjectListResponse } from '../discount-project-list/discount-project-list';
import { DiscountProjectListService } from '../discount-project-list/discount-project-list.service';
import { DiscountService } from '../discount-details/discount.service';
import { ConfiguratorDiscountDataService } from '../services/configurator-discount-data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'plm-discount-project-list',
  templateUrl: './discount-project-list.component.html',
  styleUrls: ['./discount-project-list.component.css'],
  providers: [RequestorService, DiscountProjectListService, DiscountService]
})

export class DiscountProjectListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  private addEditIntakeRequestMasterData: IntakeRequestMasterData;
  private filterContext: any;
  private filterByProjectCode: string;
  private filterByProjectType: string;
  private filterByPricingOwnerName: string;
  private filterByDescription: string;
  private filterByRequesterName: string;
  private filterByStatus: string;
  private filterByCreatedDate: string;
  private filterByProjectCodeSearchObj: any;
  private filterByProjectTypeSearchObj: any;
  private filterByPricingOwnerNameSearchObj: any;
  private filterByDescriptionSearchObj: any;
  private filterByRequesterNameSearchObj: any;
  private filterByStatusSearchObj: any;
  private filterByCreatedDateSearchObj: any;
  private showSearch: boolean;
  private key: string;
  private reverse: boolean;
  private showIntakeRequestList: Boolean;
  private intakeRequestDetails: FetchAllIntakeRequest[];

  constructor(
    private requestorService: RequestorService, 
    private createDiscountService: DiscountProjectListService, 
    private router: Router, 
    private configuratorDiscountDataService: ConfiguratorDiscountDataService
  ) {
    this.blockUI.start('Loading Discount Project List...');
    this.getDiscountProjectList();
    this.getAddEditIntakeRequestMasterData();
    this.filterContext = '';
    this.filterByProjectCode = '';
    this.filterByProjectType = '';
    this.filterByPricingOwnerName = '';
    this.filterByDescription = '';
    this.filterByRequesterName = '';
    this.filterByStatus = '';
    this.filterByCreatedDate = '';
    this.filterByProjectCodeSearchObj = '';
    this.filterByProjectTypeSearchObj = '';
    this.filterByPricingOwnerNameSearchObj = '';
    this.filterByDescriptionSearchObj = '';
    this.filterByRequesterNameSearchObj = '';
    this.filterByStatusSearchObj = '';
    this.filterByCreatedDateSearchObj = '';
    this.showIntakeRequestList = false;
  }

  ngOnInit() {
    this.getDiscountProjectList();
  }

  getDiscountProjectList() {
    this.createDiscountService.getDiscountProjectList()
      .subscribe(
      data => {
        this.intakeRequestDetails = data;
        this.initializeFilterContext();
        this.updatePricingOwnerName();
        this.checkToShowIntakeRequestList();
      },
      error => {
        console.log("Error :: " + error)
      }
      );
  }


  getAddEditIntakeRequestMasterData() {
    this.requestorService.getCreateUpdateIntakeRequestFormData().subscribe(
      data => {
        this.addEditIntakeRequestMasterData = data;
        this.checkToShowIntakeRequestList();
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }

  checkToShowIntakeRequestList() {
    if ((typeof this.addEditIntakeRequestMasterData !== 'undefined') && (typeof this.intakeRequestDetails !== 'undefined')) {
      this.showIntakeRequestList = true;
      this.blockUI.stop();
    } else {
      this.showIntakeRequestList = false;
    }
  }

  updatePricingOwnerName() {
    for (let i = 0; i < this.intakeRequestDetails.length; i++) {
      this.intakeRequestDetails[i]['pricingOwnerName'] = this.intakeRequestDetails[i]['pricingOwnerFirstName'] + ' ' + this.intakeRequestDetails[i]['pricingOwnerLastName'];
    }
  }

  initializeFilterContext() {
    this.filterByProjectCodeSearchObj = {
      'projectCode': {
        'type': 'text',
        'value': this.filterByProjectCode,
        'matchFullCase': false
      }
    };
    this.filterByProjectTypeSearchObj = {
      'projectType': {
        'type': 'text',
        'value': this.filterByProjectType,
        'matchFullCase': true
      }
    };
    this.filterByPricingOwnerNameSearchObj = {
      'pricingOwnerName': {
        'type': 'text',
        'value': this.filterByPricingOwnerName,
        'matchFullCase': true
      }
    };
    this.filterByDescriptionSearchObj = {
      'description': {
        'type': 'text',
        'value': this.filterByDescription,
        'matchFullCase': false
      }
    };
    this.filterByRequesterNameSearchObj = {
      'requesterName': {
        'type': 'text',
        'value': this.filterByRequesterName,
        'matchFullCase': false
      }
    };
    this.filterByStatusSearchObj = {
      'status': {
        'type': 'text',
        'value': this.filterByStatus,
        'matchFullCase': true
      }
    };
    this.filterByCreatedDateSearchObj = {
      'createdDate': {
        'type': 'date',
        'value': this.filterByCreatedDate,
        'matchFullCase': true
      }
    };
  }

  updateFilterContext(obj,key, newVal) {
    this[obj][key]['value'] = newVal;
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

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  moveToDiscountCodeGrid(projectCode, projectStatus) {
    this.configuratorDiscountDataService.discountProjectCode = projectCode;
    this.configuratorDiscountDataService.projectStatus = projectStatus;
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

  returnBack() {
    this.router.navigate(['']);
  }


}




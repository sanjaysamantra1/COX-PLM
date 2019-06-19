import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchAllIntakeRequest, IntakeRequestMasterData, RequestorRequestInterface, RequestorResponseInterface } from '../requestor.interface';
import { RequestorService } from '../services/requestor.service';
import { RequestorDataService } from '../services/requestor-data.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'plm-intake-request-list',
  templateUrl: './intake-request-list.component.html',
  styleUrls: ['./intake-request-list.component.css'],
  providers: [RequestorService, UtilitiesService]
})
export class IntakeRequestListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  private intakeRequestDetails: FetchAllIntakeRequest[];
  private showSearch: boolean;
  private filterContext: any;
  private filterByProjectCode: string;
  private filterByProjectType: string;
  private filterByPricingOwnerName: string;
  private filterByDescription: string;
  private filterByRequesterName: string;
  private filterByStatus: string;
  private filterByCreatedDate: string;
  private addEditIntakeRequestMasterData: IntakeRequestMasterData;
  private filterByProjectCodeSearchObj: any;
  private filterByProjectTypeSearchObj: any;
  private filterByPricingOwnerNameSearchObj: any;
  private filterByDescriptionSearchObj: any;
  private filterByRequesterNameSearchObj: any;
  private filterByStatusSearchObj: any;
  private filterByCreatedDateSearchObj: any;
  private showIntakeRequestList: Boolean;
  private key: string;
  private reverse: boolean;

  constructor(
    private requestorService: RequestorService,
    private requestorDataService: RequestorDataService,
    private utilitiesService: UtilitiesService,
    private router: Router
  ) {
    this.getAllIntakeRequestDetails();
    this.getAddEditIntakeRequestMasterData();
    this.blockUI.start('Loading Intake Request List...');
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
  }

  getAllIntakeRequestDetails() {
    this.requestorService.getAllIntakeRequestDetails().subscribe(
      data => {
        this.intakeRequestDetails = data.projectMasterFetchAll;
        this.blockUI.stop();
        this.initializeFilterContext();
        this.updatePricingOwnerName();
        this.checkToShowIntakeRequestList();
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }


  getAddEditIntakeRequestMasterData() {
    this.requestorService.getCreateUpdateIntakeRequestFormData().subscribe(
      data => {
        console.log('comes here');
        this.addEditIntakeRequestMasterData = data;
        this.requestorDataService.addEditIntakeRequestMasterData = data;
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
    return this.utilitiesService.getDateInFormat(date);
  }

  addNewIntakeRequest() {
    this.triggerEditViewIntakeRequest('add', '', 'plm-work-flow/requestor/add-intake-request');
  }

  viewIntakeRequest(intakeRequestCode) {
    this.triggerEditViewIntakeRequest('view', intakeRequestCode, 'plm-work-flow/requestor/view-intake-request');
  }

  editIntakeRequest(intakeRequestCode) {
    this.triggerEditViewIntakeRequest('edit', intakeRequestCode, 'plm-work-flow/requestor/edit-intake-request');
  }

  triggerEditViewIntakeRequest(mode, intakeRequestCode, url) {
    this.requestorDataService.addEditViewIntakeRequestMode = mode;
    this.requestorDataService.addEditViewIntakeRequestID = intakeRequestCode;
    this.router.navigate([url]);
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}

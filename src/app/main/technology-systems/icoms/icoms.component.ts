import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { IcomsService } from '../icoms/icoms.service';
import { IcomsInterface, DiscountIcomsModel, Users, IcomsStatusMasterData, IcomsUserFormData, ModifyIcomsUserRequest, ExportIcomsUserRequest } from '../icoms/icoms-interface';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppConfigService } from '../../../shared/services/app-config.service';


@Component({
  selector: 'plm-icoms',
  templateUrl: './icoms.component.html',
  providers:[IcomsService, AppConfigService]
})
export class IcomsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  private icomsTableList: IcomsInterface;
  private usersMasterData: Users;
  private icomStatusMasterData: IcomsStatusMasterData;
  private usersData: IcomsUserFormData;
  private icomsUserList: DiscountIcomsModel[];
  private users: string;

  private showSearch: boolean;
  private key: string;
  private reverse: boolean;
  private formDataAvailable: boolean;
  private updateUsersChecked: boolean;
  private submitFailed: boolean;
  private exportXlFailed: boolean;
  private exportXlSuccess: boolean;

  private filterByDiscountId: string;
  private filterByDiscountCode: string;
  private filterByDescription: string;
  private filterByVersion: string;
  private filterByICOMSStatus: string;
  private filterByOfferSeries: string;
  private filterByICOMSAssignedTo: string;
  private filterByPeerReviewedBy: string;
  private filterByDiscountCodeChanges: string;
  private filterByStartDate: string;
  private filterByEndDate: string;
  private filterByPricingMethod: string;
  private filterByDiscountCDStatus: string;
  private filterByDateCreated: string;
  private filterByIntakeRequestID: string;

  private filterByDiscountIdSearchObj: any;
  private filterByDiscountCodeSearchObj: any;
  private filterByDescriptionSearchObj: any;
  private filterByVersionSearchObj: any;
  private filterByICOMSStatusSearchObj: any;
  private filterByOfferSeriesSearchObj: any;
  private filterByICOMSAssignedToSearchObj: any;
  private filterByPeerReviewedBySearchObj: any;
  private filterByDiscountCodeChangesSearchObj: any;
  private filterByStartDateSearchObj: any;
  private filterByEndDateSearchObj: any;
  private filterByPricingMethodSearchObj: any;
  private filterByDiscountCDStatusSearchObj: any;
  private filterByDateCreatedSearchObj: any;
  private filterByIntakeRequestIDSearchObj: any; 
  private IcomsDownloadFileUrl: any;

  constructor(private router: Router, public dialog: MatDialog, private icomsService: IcomsService, private appConfigService: AppConfigService) {
    this.formDataAvailable = false;
    this.updateUsersChecked = true;
    this.submitFailed = false;
    this.exportXlFailed = false;
    this.exportXlSuccess = false;
    this.IcomsDownloadFileUrl = '';

    this.filterByDiscountId= '';
    this.filterByDiscountCode= '';
    this.filterByDescription= '';
    this.filterByVersion= '';
    this.filterByICOMSStatus= '';
    this.filterByOfferSeries= '';
    this.filterByICOMSAssignedTo= '';
    this.filterByPeerReviewedBy= '';
    this.filterByDiscountCodeChanges= '';
    this.filterByStartDate= '';
    this.filterByEndDate= '';
    this.filterByPricingMethod= '';
    this.filterByDiscountCDStatus= '';
    this.filterByDateCreated= '';
    this.filterByIntakeRequestID= '';

    this.filterByDiscountIdSearchObj= '';
    this.filterByDiscountCodeSearchObj= '';
    this.filterByDescriptionSearchObj= '';
    this.filterByVersionSearchObj= '';
    this.filterByICOMSStatusSearchObj= '';
    this.filterByOfferSeriesSearchObj= '';
    this.filterByICOMSAssignedToSearchObj= '';
    this.filterByPeerReviewedBySearchObj= '';
    this.filterByDiscountCodeChangesSearchObj= '';
    this.filterByStartDateSearchObj= '';
    this.filterByEndDateSearchObj= '';
    this.filterByPricingMethodSearchObj= '';
    this.filterByDiscountCDStatusSearchObj= '';
    this.filterByDateCreatedSearchObj= '';
    this.filterByIntakeRequestIDSearchObj= '';
    this.getFormData();
    this.blockUI.start('Loading ICOMS Table Data...');
  }

  ngOnInit() {
    this.getIocmsTableData();
  }

  getIocmsTableData() {
    this.icomsService.getIcomsTableList().subscribe(
      data => {
        this.icomsUserList = data.discountIcomsModel;
        this.initializeFilterContext();
        this.blockUI.stop();
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }

  getFormData() {
      this.icomsService.getFormData()
        .subscribe(
            data => {
                this.usersData = data;
                this.populateData(data);
            },
            error => {
                console.log("Error :: " + error)
            }
        );
  }

  populateData(data) {
    this.usersMasterData = data.users;
    this.icomStatusMasterData = data.icomsStatus[0].records;
  }

  updateIcomsUsersData() {
    const reqObjArray: ModifyIcomsUserRequest = {
      "discountIcomsModel": []
    };
    let count = 0;
    if (this.icomsUserList.length > 0) {
      for (let i = 0; i < this.icomsUserList.length; i++) {
        if (this.icomsUserList[i].checked) {
          count++;
          const reqObj: any = {
            discountMapIcomsId : Number(this.icomsUserList[i].discountMapIcomsId),
            icomsStatusId : this.icomsUserList[i].icomsStatusId,
            discountId : Number(this.icomsUserList[i].discountId),
            discountCode : this.icomsUserList[i].discountCode,
            description : this.icomsUserList[i].description,
            version : this.icomsUserList[i].version,
            assignedTo : this.icomsUserList[i].assignedTo,
            peerReviewBy : this.icomsUserList[i].peerReviewBy,
            offerSeries : this.icomsUserList[i].offerSeries,
            discountCodeChanges : this.icomsUserList[i].discountCodeChanges,
            startDate : this.icomsUserList[i].startDate,
            endDate : this.icomsUserList[i].endDate,
            priceMethodId : this.icomsUserList[i].priceMethodId,
            createdDate : this.icomsUserList[i].createdDate,
            discountCodeStatusId : this.icomsUserList[i].discountCodeStatusId,
            projectCode : this.icomsUserList[i].projectCode,
          };
          
          reqObjArray.discountIcomsModel.push(reqObj);
        }
      }
    }
    console.log(count);
    if (count > 0) {
      console.log(reqObjArray);
      this.icomsService.updateIcomsTableList(reqObjArray)
        .subscribe(
        data => {
          if (data.actionStatus === "SUCCESS") {
            this.submitIcomsUpdate();
          } else {
            this.submitFailed = true;
            setTimeout(function() {
                this.hideStatus();
            }.bind(this), 5000);
          }
        },
        error => {
          console.log("Error :: " + error);
          this.submitFailed = true;
        }
        );
    }
  }

  exportIcomsUsersData() { 
    let count = 0; 
    const discountMapIcomsId = [];
    if (this.icomsUserList.length > 0) {
      for (let i = 0; i < this.icomsUserList.length; i++) {
        if (this.icomsUserList[i].checked) {
          count++; 
          discountMapIcomsId.push(Number(this.icomsUserList[i].discountMapIcomsId)); 
        }
      }
    }
    console.log(count);
    if (count > 0) { 
      location.href = this.appConfigService.url + '/plm-engine/plm/systems/v0/icoms/download/' + JSON.stringify(discountMapIcomsId);
    }
  }

  getIndexByUserID(discountMapIcomsId) {
    let result = 0;
    for (let i = 0; i < this.icomsUserList.length; i++) {
      if (this.icomsUserList[i].discountMapIcomsId === discountMapIcomsId) {
        result = i;
        break;
      }
    }
    return result;
  }

  modifyIcomsUserListObject() {
    if (this.icomsUserList.length > 0) {
      for (let i = 0; i < this.icomsUserList.length; i++) {
        this.icomsUserList[i].discountMapIcomsId = this.icomsUserList[i].discountMapIcomsId;
        this.icomsUserList[i].icomsStatusId = this.icomsUserList[i].icomsStatusId;
        this.icomsUserList[i].discountCode = this.icomsUserList[i].discountCode;
        this.icomsUserList[i].description = this.icomsUserList[i].description;
        this.icomsUserList[i].version = this.icomsUserList[i].version;
        this.icomsUserList[i].assignedTo = this.icomsUserList[i].assignedTo;
        this.icomsUserList[i].peerReviewBy = this.icomsUserList[i].peerReviewBy;
        this.icomsUserList[i].offerSeries = this.icomsUserList[i].offerSeries;
        this.icomsUserList[i].discountCodeChanges = this.icomsUserList[i].discountCodeChanges;
        this.icomsUserList[i].startDate = this.icomsUserList[i].startDate;
        this.icomsUserList[i].endDate = this.icomsUserList[i].endDate;
        this.icomsUserList[i].priceMethodId = this.icomsUserList[i].priceMethodId;
        this.icomsUserList[i].createdDate = this.icomsUserList[i].createdDate;
        this.icomsUserList[i].discountCodeStatusId = this.icomsUserList[i].discountCodeStatusId;
        this.icomsUserList[i].projectCode = this.icomsUserList[i].projectCode;     
      }
    }
    this.users = JSON.stringify(this.icomsUserList);
    this.initializeFilterContext();
  }

  enableDisableUpdateButton(isChecked) {
    let count = 0;
    if (this.icomsUserList.length > 0) {
      for (let i = 0; i < this.icomsUserList.length; i++) {
        if (this.icomsUserList[i].checked) {
          count++;
        }
      }
    }
    if (count > 0) {
      this.updateUsersChecked = false;
    } else {
      this.updateUsersChecked = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogIcomsUpdate, {
      width: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  submitIcomsUpdate() {
    this.openDialog();
  }

  initializeFilterContext() {
    this.filterByDiscountIdSearchObj = {
      'discountId': {
        'type': 'text',
        'value': this.filterByDiscountId,
        'matchFullCase': false
      }
    };
    this.filterByDiscountCodeSearchObj = {
      'discountCode': {
        'type': 'text',
        'value': this.filterByDiscountCode,
        'matchFullCase': false
      }
    };
    this.filterByDescriptionSearchObj = {
      'description': {
        'type': 'text',
        'value': this.filterByDescription,
        'matchFullCase': false
      }
    };
    this.filterByVersionSearchObj = {
      'version': {
        'type': 'text',
        'value': this.filterByVersion,
        'matchFullCase': false
      }
    };
    this.filterByICOMSStatusSearchObj = {
      'icomsStatusId': {
        'type': 'text',
        'value': this.filterByICOMSStatus,
        'matchFullCase': false
      }
    };
    this.filterByOfferSeriesSearchObj = {
      'offerSeries': {
        'type': 'text',
        'value': this.filterByOfferSeries,
        'matchFullCase': false
      }
    };
    this.filterByICOMSAssignedToSearchObj = {
      'assignedTo': {
        'type': 'text',
        'value': this.filterByICOMSAssignedTo,
        'matchFullCase': false
      }
    };
    this.filterByPeerReviewedBySearchObj = {
      'peerReviewBy': {
        'type': 'text',
        'value': this.filterByPeerReviewedBy,
        'matchFullCase': false
      }
    };
    this.filterByDiscountCodeChangesSearchObj = {
      'discountCodeChanges': {
        'type': 'text',
        'value': this.filterByDiscountCodeChanges,
        'matchFullCase': false
      }
    };
    this.filterByStartDateSearchObj = {
      'startDate': {
        'type': 'date',
        'value': this.filterByStartDate,
        'matchFullCase': false
      }
    };
    this.filterByEndDateSearchObj = {
      'endDate': {
        'type': 'date',
        'value': this.filterByEndDate,
        'matchFullCase': false
      }
    };
    this.filterByPricingMethodSearchObj = {
      'priceMethodId': {
        'type': 'text',
        'value': this.filterByPricingMethod,
        'matchFullCase': false
      }
    };
    this.filterByDiscountCDStatusSearchObj = {
      'discountCodeStatusId': {
        'type': 'text',
        'value': this.filterByDiscountCDStatus,
        'matchFullCase': false
      }
    };
    this.filterByDateCreatedSearchObj = {
      'createdDate': {
        'type': 'date',
        'value': this.filterByDateCreated,
        'matchFullCase': false
      }
    };
    this.filterByIntakeRequestIDSearchObj = {
      'projectCode': {
        'type': 'text',
        'value': this.filterByIntakeRequestID,
        'matchFullCase': false
      }
    };
  }

  hideStatus(){
      this.submitFailed = false;
      this.exportXlFailed = false;
      this.exportXlSuccess = false;
  }

  updateFilterContext(obj,key, newVal) {
    this[obj][key]['value'] = newVal;
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  returnBack() {
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

}

@Component({
  selector: 'plm-icoms-update-confirmation-dialog',
  templateUrl: './icoms-update-confirmation-dialog.html'
})
export class DialogOverviewExampleDialogIcomsUpdate {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogIcomsUpdate>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }

}

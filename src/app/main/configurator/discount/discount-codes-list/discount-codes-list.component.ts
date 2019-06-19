import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetDiscountListResponse, Discount, ModifyDiscountList } from './discount--codes-list.interface';
import { DiscountCodesListService } from './discount-codes-list.service';
import { ConfiguratorDiscountDataService } from '../services/configurator-discount-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'plm-discount-codes-list',
  templateUrl: './discount-codes-list.component.html',
  styleUrls: ['./discount-codes-list.component.css'],
  providers: [DiscountCodesListService]
})
export class DiscountCodesListComponent implements OnInit {

  @Output() statusUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @BlockUI() blockUI: NgBlockUI;

  private discountCodeist: Discount[];
  private projectCode: String;
  private discountList: Boolean[];
  private discountListForRelease: number[];
  private discountsSelected: Boolean;
  private showSearch: boolean;
  private key: string;
  private reverse: boolean;
  private rowSelected: boolean;

  private filterBydiscountID: string;
  private filterBydiscountCode: string;
  private filterByversion: string;
  private filterBystartDate: string;
  private filterByendDate: string;
  private filterBycreatedDate: string;
  private filterBystatus: string;
  private filterByrequestDescription: string;

  private filterBydiscountIDSearchObj: any;
  private filterBydiscountCodeSearchObj: any;
  private filterByversionSearchObj: any;
  private filterBystartDateSearchObj: any;
  private filterByendDateSearchObj: any;
  private filterBycreatedDateSearchObj: any;
  private filterBystatusSearchObj: any;
  private filterByrequestDescriptionSearchObj: any;
  private updateDiscountListChecked: boolean;
  private sendNotificationFail: boolean;


  constructor(private discountListService: DiscountCodesListService, private router: Router, private configuratorDiscountDataService: ConfiguratorDiscountDataService, public dialog: MatDialog) {
    this.blockUI.start('Loading Discounts Code List...');
    this.discountList = [];
    this.projectCode = this.configuratorDiscountDataService.discountProjectCode;
    this.getDiscountCodeist();
    this.discountListForRelease = [];
    this.discountsSelected = false;
    this.updateDiscountListChecked = true;
    this.sendNotificationFail = false;
    this.rowSelected = true;

    this.filterBydiscountID = '';
    this.filterBydiscountCode = '';
    this.filterByversion = '';
    this.filterBystartDate = '';
    this.filterByendDate = '';
    this.filterBycreatedDate = '';
    this.filterBystatus = '';
    this.filterByrequestDescription = '';

    this.filterBydiscountIDSearchObj = '';
    this.filterBydiscountCodeSearchObj = '';
    this.filterByversionSearchObj = '';
    this.filterBystartDateSearchObj = '';
    this.filterByendDateSearchObj = '';
    this.filterBycreatedDateSearchObj = '';
    this.filterBystatusSearchObj = '';
    this.filterByrequestDescriptionSearchObj = '';
  }

  ngOnInit() {
    this.initializeFilterContext();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleExtractDialogUpdate, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getDiscountCodeist() {
    this.discountListService.getDiscountList(this.projectCode)
      .subscribe(
      data => {
        this.discountCodeist = data.discounts;
        if ((typeof this.discountCodeist !== 'undefined') && (this.discountCodeist !== null) && (this.discountCodeist.length > 0)) {
          for (let i = 0; i < this.discountCodeist.length; i++) {
            this.discountList[i] = false;
          }
        }
        this.blockUI.stop();
      },
      error => {
        console.log("Error :: " + error)
      }
      );
  }


  submitIcomsUpdate() {
    let discountsArray = [];
    if (this.discountListForRelease.length > 0) {
      this.sendNotificationFail = false;
      this.discountListService.submitDiscountForICOMSExtract(this.discountListForRelease)
        .subscribe(
        data => {
          if (data.actionStatus === "SUCCESS") {
            this.openDialog();
          } else {
            this.statusUpdated.emit(false);
            this.sendNotificationFail = true;
          }
        },
        error => {
          this.sendNotificationFail = true;
          console.log("Error :: " + error)
        }
        );
    }
  }

  updateDiscountForRelease(isChecked, discountID) {
    if (isChecked) {
      this.discountListForRelease.push(discountID);
    } else {
      this.discountListForRelease.splice(this.discountListForRelease.indexOf(discountID), 1);
    }
    this.showHideExtractToDiscountButton();
  }

  showHideExtractToDiscountButton() {
    if (this.discountListForRelease.length > 0) {
      this.discountsSelected = true;
    } else {
      this.discountsSelected = false;
    }
  }

  moveToAddDiscountPage(mode, discountCode) {
    this.configuratorDiscountDataService.addEditViewDiscountMode = mode;
    this.configuratorDiscountDataService.addEditViewDiscountCode = discountCode;
    this.router.navigate(['/plm-work-flow/configurator/discount/add-discount']);
  }

  // moveToDiscountGrid() {
  //   this.configuratorDiscountDataService.addEditViewDiscountMode = 'add';
  //   this.router.navigate(['/plm-work-flow/configurator/discount/add-discount']);
  // }

  moveToIntakeRequestView() {
    this.configuratorDiscountDataService.discountProjectCode = this.projectCode;
    this.router.navigate(['/plm-work-flow/configurator/discount/intake-request']);
  }

  // editIntakeRequest(discountCode) {
  //   this.configuratorDiscountDataService.addEditViewDiscountMode = 'edit';
  //   this.configuratorDiscountDataService.addEditViewDiscountCode = discountCode;
  //   this.router.navigate(['/plm-work-flow/configurator/discount/add-discount']);
  // }

  // moveToDiscountView(discountCode) {
  //   this.configuratorDiscountDataService.addEditViewDiscountMode = 'view';
  //   this.configuratorDiscountDataService.addEditViewDiscountCode = discountCode;
  //   this.router.navigate(['/plm-work-flow/configurator/discount/add-discount']);
  // }


  releaseDiscountForICOMSExtract() {
    const reqObj = {
      'projectCode': this.projectCode,
      'offersList': this.releaseDiscountForICOMSExtract
    }
    this.discountListService.submitDiscountForICOMSExtract(reqObj)
      .subscribe(
      data => {
        this.router.navigate(['/plm-work-flow/technology-systems/icoms']);
      },
      error => {
        console.log("Error :: " + error)
      }
      );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  initializeFilterContext() {
    this.filterBydiscountIDSearchObj = {
      'discountId': {
        'type': 'text',
        'value': this.filterBydiscountID,
        'matchFullCase': false
      }
    };
    this.filterBydiscountCodeSearchObj = {
      'discountCode': {
        'type': 'text',
        'value': this.filterBydiscountCode,
        'matchFullCase': false
      }
    };
    this.filterByversionSearchObj = {
      'version': {
        'type': 'text',
        'value': this.filterByversion,
        'matchFullCase': false
      }
    };
    this.filterBystartDateSearchObj = {
      'startDate': {
        'type': 'date',
        'value': this.filterBystartDate,
        'matchFullCase': true
      }
    };
    this.filterByendDateSearchObj = {
      'endDate': {
        'type': 'date',
        'value': this.filterByendDate,
        'matchFullCase': true
      }
    };
    this.filterBycreatedDateSearchObj = {
      'createdDate': {
        'type': 'date',
        'value': this.filterBycreatedDate,
        'matchFullCase': true
      }
    };
    this.filterBystatusSearchObj = {
      'status': {
        'type': 'text',
        'value': this.filterBystatus,
        'matchFullCase': false
      }
    };
    this.filterByrequestDescriptionSearchObj = {
      'description': {
        'type': 'text',
        'value': this.filterByrequestDescription,
        'matchFullCase': false
      }
    };
  }

  updateFilterContext(obj, key, newVal) {
    this[obj][key]['value'] = newVal;
  }


  returnBack() {
    this.router.navigate(['/plm-work-flow/configurator/discount/project-list']);
  }

}

@Component({
  selector: 'icoms-extract-confirmation-dialog',
  templateUrl: './icoms-extract-confirmation-dialog.html'
})
export class DialogOverviewExampleExtractDialogUpdate {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleExtractDialogUpdate>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }

}


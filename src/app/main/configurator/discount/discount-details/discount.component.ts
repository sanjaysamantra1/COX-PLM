import { Component, OnInit, Output, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  AddDiscountFormMasterData,
  GetDiscriptionBuilder,
  GetDiscountIcomsStatus,
  IcomsStatusModel,
  DiscountGift,
  DiscMapPreRequisite,
  DiscMapOscar,
  GetDisMapMainPage,
  GetDiscMapOnline,
  GetMappingTable,
  DiscountFormMasterData,
  DiscountFormDropDown,
  TeCode,
  SubmitDiscountInfo,
  GetDiscountGeneralInformation,
  GetCampaignCodePricingMethod
} from './discount-interface';
import { DiscountService } from './discount.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfiguratorDiscountDataService } from '../services/configurator-discount-data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'plm-discount',
  templateUrl: './discount.component.html',
  providers: [DiscountService]
})
export class DiscountComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  private discountsDescriptionBuilder: GetDiscriptionBuilder;
  private discountIcomsForms: GetDiscountIcomsStatus;
  private DisountsFormsData: string;
  private discountGift: DiscountGift;
  private discMapPreRequisite: DiscMapPreRequisite;
  private discMapOscar: DiscMapOscar;
  private disMapMainPage: GetDisMapMainPage;
  private discMapOnline: GetDiscMapOnline;
  private masterData: AddDiscountFormMasterData;
  private pricingRules: any;
  private addEditDiscountSubmitData: any;
  private discountFormDropDown: DiscountFormDropDown;
  private mappingTable: GetMappingTable;
  private discountGeneralInformation: GetDiscountGeneralInformation;
  private campaignCodePricingMethod: GetCampaignCodePricingMethod;
  private formDataLoaded: boolean;
  private singleSelectSettings = {};
  private multiSelectSettings = {};
  private fileToUpload: any;
  private saveAndExitSuccess: Boolean;
  private saveAndExitFail: Boolean;
  private discountAddSubmitFailed: Boolean;
  private saveSubmitResult: string;
  private addEditMode: Boolean;
  private viewMode: Boolean;
  private finalSubmitData: any;

  constructor(private discountService: DiscountService, private configuratorDiscountDataService: ConfiguratorDiscountDataService, private router: Router, public dialog: MatDialog) {
    this.blockUI.start('Loading Discounts Details...');
    this.getAddDiscountMasterData();
    this.initializeDiscountFormSubmitData();
    this.saveAndExitFail = false;
    this.saveAndExitSuccess = false;
    this.fileToUpload = null;
    this.discountAddSubmitFailed = false;
    this.formDataLoaded = false;
    this.saveSubmitResult = '';
    this.addEditMode = false;
    this.viewMode = false;
    this.finalSubmitData = '';
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.singleSelectSettings = {
      singleSelection: true,
      text: 'Select One',
      enableSearchFilter: true
    };
    this.multiSelectSettings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      badgeShowLimit: 3,
      maxHeight: 120
    };
  }

  openSubmitSuccessDialog(): void {
    let dialogRef = this.dialog.open(SubmitSuccessDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openSaveSuccessDialog(): void {
    let dialogRef = this.dialog.open(SaveSuccessDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openExitErrorDialog(): void {
    let dialogRef = this.dialog.open(ExitFormErrorDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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
  }

  getAddDiscountMasterData() {
    this.discountService.getAddDiscountMasterData()
      .subscribe(
      data => {
        this.masterData = data;
        this.populateFormFieldValues();
        this.updatePageMode();
        this.blockUI.stop();
       if (this.addEditDiscountSubmitData.actionStatus === 'SUCCESS') {
          this.configuratorDiscountDataService.addEditViewDiscountCode = this.configuratorDiscountDataService.addEditDiscountSubmitData;
          this.openDialog();
        } else if (this.addEditDiscountSubmitData.actionStatus === 'FAIL') {
          this.showErrorMessage();
        }

      },
      error => {
        console.log('Error :: ' + error)
      }
      );
  }

  getEditDiscountData() {
    this.discountService.getEditDiscountFormData(this.configuratorDiscountDataService.addEditViewDiscountCode)
      .subscribe(
      data => {
        console.log(data);
          this.configuratorDiscountDataService.addEditDiscountSubmitData = data.discount;
      },
      error => {
        console.log('Error :: ' + error)
      }
      );
  }

  // submitUserData() {
  //   this.configuratorDiscountDataService.preReqOfferTemplate = this.fileToUpload;
  //   this.discountService.submitProject(this.configuratorDiscountDataService.addEditDiscountSubmitData)
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       if (data.actionStatus == 'SUCCESS') {
  //         this.configuratorDiscountDataService.addEditViewDiscountCode = data.discount.discountId;
  //         this.showSaveSubmitDialog();
  //       } else if (data.actionStatus == 'FAIL') {
  //         this.showErrorMessage();
  //       }
  //     },
  //     error => {
  //       console.log('Error :: ' + error)
  //     }
  //     );
  // }


  submitProject() {
    this.saveSubmitResult = 'submit';
    this.formDataLoaded = false;
    this.blockUI.start('Submitting Discount...');
    if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'add') {
      this.addNewDiscount('submit');
    } else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit') {
      this.updateExistingDiscount('submit');
    }
  }

  saveAndExit() {
    this.formDataLoaded = false;
    this.blockUI.start('Saving Discount...');
    if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'add') {
      this.addNewDiscount('save');
    } else if (this.configuratorDiscountDataService.addEditViewDiscountMode == 'edit') {
      this.updateExistingDiscount('save');
    }
  }

  addNewDiscount(mode) {
    this.configuratorDiscountDataService.preReqOfferTemplate = this.fileToUpload;
    this.configuratorDiscountDataService.isSubmitted = (mode == 'submit') ? true : false;
    this.removeInvalidPricingRules();
    this.discountService.postAddDiscountDetails(
      this.finalSubmitData, 
      this.configuratorDiscountDataService.preReqOfferTemplate,
      this.configuratorDiscountDataService.isSubmitted
    ).subscribe(
      data => {
        console.log(data);
        if (data.actionStatus == 'SUCCESS') {
          this.configuratorDiscountDataService.addEditViewDiscountCode = data.discount.discountId;
          this.showSaveSubmitDialog();
        } else if (data.actionStatus == 'FAIL') {
          this.showErrorMessage();
        }
        this.blockUI.stop();
      },
      error => {
        console.log('Error :: ' + error);
        this.showErrorMessage();
        this.blockUI.stop();
      }
    );
  }

  updateExistingDiscount(mode) { 
    this.configuratorDiscountDataService.preReqOfferTemplate = this.fileToUpload;
    this.configuratorDiscountDataService.isSubmitted = (mode == 'submit') ? true : false;
    this.removeInvalidPricingRules();
    this.discountService.postAddDiscountDetails(
      this.finalSubmitData, 
      this.configuratorDiscountDataService.preReqOfferTemplate,
      this.configuratorDiscountDataService.isSubmitted
    ).subscribe(
      data => {
        console.log(data);
        if (data.actionStatus == 'SUCCESS') {
          this.configuratorDiscountDataService.addEditViewDiscountCode = data.discount.discountId;
          this.showSaveSubmitDialog();
        } else if (data.actionStatus == 'FAIL') {
          this.showErrorMessage();
        }
        this.blockUI.stop();
      },
      error => {
        console.log('Error :: ' + error);
        this.showErrorMessage();
        this.blockUI.stop();
      }
    );
  }  

  populateFormFieldValues() {
    for (let i = 0; i < this.masterData.commonMasterData.length; i++) {
      const currentMasterData = this.masterData.commonMasterData[i];
      const keyName = currentMasterData.name.replace(/\s+/g, '_');
      this.discountFormDropDown[keyName] = currentMasterData.records;
    }
    this.discountFormDropDown['teCodeResponse'] = this.masterData['teCodeResponse'];
    this.discountFormDropDown['campaignCodesList'] = this.masterData['campaignCodesList'];
    this.discountFormDropDown['priceMethodMasterDataList'] = this.masterData['priceMethodMasterDataList'];
    this.configuratorDiscountDataService.discountMasterData = this.discountFormDropDown;
    this.formDataLoaded = true;
  }

  removeInvalidPricingRules() {
    console.log(this.configuratorDiscountDataService.addEditDiscountSubmitData);
    this.finalSubmitData = JSON.parse(JSON.stringify(this.configuratorDiscountDataService.addEditDiscountSubmitData));
    let result = [];
    // this.finalSubmitData.pricingRules.shift();
    for (let i=0; i<this.finalSubmitData.pricingRules.length; i++) {
      let resultObj = {};
      console.log(this.finalSubmitData.pricingRules[i]);
      let currentPricingRule = this.finalSubmitData.pricingRules[i];
      console.log(typeof currentPricingRule.pricingCategoryName);
      console.log(currentPricingRule.pricingCategoryName);
      console.log(currentPricingRule.presentationCodeId);
      console.log(currentPricingRule.pricebookChrgIcomscodeDesc);
      if ((typeof currentPricingRule.pricingCategoryName == 'undefined') || ((currentPricingRule.pricingCategoryName == '') && (currentPricingRule.presentationCodeId == '') && (currentPricingRule.pricebookChrgIcomscodeDesc == ''))) {
        delete this.finalSubmitData.pricingRules[i];
        continue;
      } 
      console.log(this.finalSubmitData.pricingRules[i]);
      delete this.finalSubmitData.pricingRules[i].pricingCategoryDropDownList;
      delete this.finalSubmitData.pricingRules[i].statementPresentationCodeDropDownList;
      delete this.finalSubmitData.pricingRules[i].priceBookICOMSCodeDropDownList;
      delete this.finalSubmitData.pricingRules[i].priceBookICOMSCodeDropDownList;
      if ((typeof this.finalSubmitData.pricingRules[i].priceBookICOMSCodeSelectedItems !=='undefined') && (this.finalSubmitData.pricingRules[i].priceBookICOMSCodeSelectedItems.length > 0)) {
        this.finalSubmitData.pricingRules[i].pricebookChrgIcomscodeDesc = JSON.parse(JSON.stringify(this.finalSubmitData.pricingRules[i].priceBookICOMSCodeSelectedItems[0].itemName));
        this.finalSubmitData.pricingRules[i].priceBookId = Number(JSON.parse(JSON.stringify(this.finalSubmitData.pricingRules[i].priceBookICOMSCodeSelectedItems[0].id)));
      } else {
        this.finalSubmitData.pricingRules[i].pricebookChrgIcomscodeDesc = '';
        this.finalSubmitData.pricingRules[i].priceBookId = 0;
      }
     
      delete this.finalSubmitData.pricingRules[i].priceBookICOMSCodeSelectedItems;
      delete this.finalSubmitData.pricingRules[i].pricingCategorySelectedItems;
      delete this.finalSubmitData.pricingRules[i].statementPresentationCodeSelectedItems;
      delete this.finalSubmitData.pricingRules[i].pricingRulesObjAssociated;
      delete this.finalSubmitData.pricingRules[i].markets;
      delete this.finalSubmitData.pricingRules[i].descriptionBuilderAmount;
      delete this.finalSubmitData.pricingRules[i].pricingMethod;
      if (this.finalSubmitData.pricingRules[i]) {
        result.push(this.finalSubmitData.pricingRules[i]);
      }
    }
    this.finalSubmitData.pricingRules = [];
    this.finalSubmitData.pricingRules = result;
    this.finalSubmitData.discMapPreRequisite.teCodes = this.configuratorDiscountDataService.teCodes;
    delete this.finalSubmitData.discMapPreRequisite.preReqOfferTemplate;
    console.log(this.finalSubmitData.pricingRules);
  }


  onFileUpload(fileUpload: any): void {
    this.fileToUpload = fileUpload;
  }

  showErrorMessage() {
    if (this.saveSubmitResult == 'submit') {
      this.discountAddSubmitFailed = true;
    } else if (this.saveSubmitResult == 'save') {
      this.saveAndExitFail = true;
    }
  }

  showSaveSubmitDialog() {
    if (this.saveSubmitResult  == 'submit') {
      this.openSubmitSuccessDialog();
    } else if (this.saveSubmitResult == 'save') {
      this.openSaveSuccessDialog();
    }
  }


  initializeDiscountFormSubmitData() {
    this.discountFormDropDown = {
      'VIDEO_TIERS': [],
      'PHONE_TIERS': [],
      'HOMELIFE_TIERS': [],
      'ANCILLARY': [],
      'EQUIPMENT': [],
      'INSTALL': [],
      'GIFT_VALIDATION_STATUS': [],
      'OFFER_FAMILY': [],
      'FINANCE_BUCKET_CD': [],
      'PROGRAM_NM': [],
      'CUSTOMER_TARGET': [],
      'CAMPAIGN_TYPE': [],
      'CAMPAIGN_SUBTYPE': [],
      'SA_TYPE_REQUIRED': [],
      'INSTALL_INCLUDED': [],
      'PRODUCT': [],
      'OSCAR_STATUS': [],
      'FINANCE_BUCKET_PROG_CD': [],
      'SPCL_HANDLING_INSTRUCTIONS': [],
      'MARGIN_BUCKET': [],
      'MARKETING_ID_DESC': [],
      'MP_NEW_EXISTING': [],
      'MP_OFFER_PRODUCT': [],
      'MP_OFFER_TYPE': [],
      'MP_TARGETED_AUDIENCE': [],
      'MP_INSTALLATION_TPR': [],
      'ONLINE_STATUS': [],
      'PRICING_CATEGORY': [],
      'PRESENTATION_CODE': [],
      'MARKETING_ID': [],
      'ICOMS_STATUS': [],
      'IT_PEER_REVIWED': [],
      'IT_ASSIGNED_TO': [],
      'DISCOUNT_TYPES': [],
      'DATA_TIRES': [],
      'MIN_VIDEO_TIER': [],
      'MIN_DATA_TIER': [],
      'MIN_PHONE_TIER': [],
      'MIN_HOME_LIFE_TIER': [],
      'MARKETS': [],
      'MARKETSObj': [],
      'SITESObj': [],
      'TECODERESPONSE': [],
      'PRICING_METHOD': [],
      'DISCOUNT_SUB_TYPE': [],
      'Parent_Discount_Code': [],
      'Replacing_Discount_Code': [],
      'Project': []
    };
    this.addEditDiscountSubmitData = {
      'discountId': null,
      'createdByUser': '',
      'createdDate': '',
      'description': '',
      'discountCode': '',
      'endDate': '',
      'modifiedDate': '',
      'notes': '',
      'startDate': '',
      'version': '',
      'sites': [],
      'projectCode': this.configuratorDiscountDataService.discountProjectCode,
      'type': '',
      'status': 1024,
      'parentCampaignId': null,
      'replacingCampaignId': null,
      'failedSelfInstalledCredit': '',
      'endDateLastChange': '',
      'selfInstallIncentive': '',
      'active': false,
      'future': false,
      'projectId': null,
      'reviewBeforeExpirationStatusId': null,
      'discMapDescrBuild': this.getInitialDescriptionBuilder(),
      'discountGift': this.getIntialGiftCard(),
      'discMapPriceMethod': this.getPricingMethod(),
      'discMappingEntity': this.getMappingEntity(),
      'discMapOscar': this.getOscar(),
      'discMapMainPage': this.getMainPage(),
      'discMapOnline': this.getOnline(),
      'discMapPreRequisite': this.getPreReq(),
      'pricingRules': this.getPricingRules()
    };
    this.configuratorDiscountDataService.addEditDiscountSubmitData = JSON.parse(JSON.stringify(this.addEditDiscountSubmitData));
    if ((this.configuratorDiscountDataService.addEditViewDiscountMode === 'edit') || (this.configuratorDiscountDataService.addEditViewDiscountMode === 'view')) {
      this.getEditDiscountData();
    }
  }

  getInitialDescriptionBuilder() {
    return {
      'descrBuildId': 100,
      'formula': '',
      'amount': 0,
      'discountTypeId': 666,
      'videoTierIds': [],
      'dataTierIds': [],
      'phoneTierIds': [],
      'hmLifeTierIds': [],
      'ancillaryFeatureIds': [],
      'equipmentIds': [],
      'installIds': []
    };
  }

  getIntialGiftCard() {
    return {
      'discountMapGiftId': null,
      'giftcardAmount': '',
      'included': false,
      'validationStatusId': null,
      'notes': ''
    }
  }

  getPricingMethod() {
    return {
      'priceMethodId': null,
      'methodId': null,
      'methodAttributes': []
    };
  }

  getMappingEntity() {
    return {
      'mappingId': null,
      'discount': '',
      'marketName': '',
      'mrc': '',
      'numberOfPsu': '',
      'primaryDuration': '',
      'psuRequired': '',
      'retailRate': '',
      'secondryDuration': '',
      'secondryStepupAmount': '',
      'financeBucketCdId': null,
      'programNmId': null,
      'customerTargetId': null,
      'campaignTypeId': null,
      'campaignSubTypeId': null,
      'minDataTierId': null,
      'minPhoneTierId': null,
      'minHomeLifeTierId': null,
      'productId': null,
      'saTypeRequiredId': null,
      'installIncludeId': null,
      'offerFamilyId': null,
      'minVideoTierId': null
    };
  }

  getOscar() {
    return {
      'oscarId': null,
      'statusId': null,
      'createdDate': '',
      'financeBucketProgCdId': null,
      'salesAdvise': '',
      'adviceFormula': '',
      'saRequired': '',
      'mrktId': null
    };
  }

  getMainPage() {
    return {
      'mainPageId': null,
      'mpMarkets': '',
      'mpNotes': '',
      'mpOffer': '',
      'mpOfferDetailsRestrict': '',
      'mpSalesChannel': '',
      'showMainpageFlg': false,
      'mpOfferProductId': null,
      'mpTargetedAudienceId': null,
      'mpInstallationTprId': null,
      'mpNewExistingId': null,
      'mpOfferTypeId': null,
      'channelIds': [],
      'tacticIds': []
    }
  }

  getOnline() {
    return {
      'discOnlineMapId': null,
      'disclaimer': '',
      'ecomPromoCode': '',
      'savingsSticker': '',
      'uptierValues': '',
      'onlineStatusId': null
    };
  }


  getPreReq() {
    return {
      'preReqId': null,
      'cmpgnCdAIncIfOne': '',
      'cmpgnCdDExcIfAny': '',
      'cmpgnCdNumOfDays': '',
      'cmpgnLongDescr': '',
      'curntSrvcAIncIfOne': '',
      'curntSrvcBIncIfAll': '',
      'curntSrvcCIncIfAtlst': '',
      'curntSrvcCOfThese': '',
      'curntSrvcDExcIfAny': '',
      'curntSrvcEExcIfAll': '',
      'curntSrvcFExcIfAtlst': '',
      'curntSrvcFOfThese': '',
      'icomsAccessList1': '',
      'icomsAccessList2': '',
      'icomsAccessList3': '',
      'icomsAccessList4': '',
      'icomsAccessList5': '',
      'icomsAccessList6': '',
      'instlSrvcAIncIfOne': '',
      'instlSrvcBIncIfAll': '',
      'instlSrvcCIncIfAtlst': '',
      'instlSrvcCOfThese': '',
      'instlSrvcDExcIfAny': '',
      'instlSrvcEExcIfAll': '',
      'instlSrvcFExcIfAtlst': '',
      'instlSrvcFOfThese': '',
      'mrktIdAIncIfOne': '',
      'mrktIdDExcIfAny': '',
      'otherInsrct': '',
      'plgInstlAIncIfOne': '',
      'plgInstlBIncIfAll': '',
      'plgInstlDExcIfAny': '',
      'plgRetnAIncIfOne': '',
      'plgRetnDExcIfAny': '',
      'retnSrvcAIncIfOne': '',
      'retnSrvcBIncIfAll': '',
      'retnSrvcCIncIfAtlst': '',
      'retnSrvcCOfThese': '',
      'retnSrvcDExcIfAny': '',
      'retnSrvcEExcIfAll': '',
      'retnSrvcFExcIfAtlst': '',
      'retnSrvcFOfThese': '',
      'preReqIcomsDataBlob': null,
      'teCodes': []
    };
  }

  getPricingRules() {
    return [{
      'codepricingRulesId': null,
      'absorb': 'No',
      'activeService': 'No',
      'amtFrstBundleDiscount': 0,
      'amtMinReqPricingCatg': 0,
      'bundleDiscount': false,
      'campaignDollarOff': 0,
      'fixedPricing': 0,
      'minRequirmnt': false,
      'numOccurnceDiscount': 0,
      'numOfMnths': 0,
      'other': '',
      'pricebookChrgIcomscodeDesc': '',
      'pricebookChrgReltdIcomscode': '',
      'pricebookEndDate': '',
      'pricebookStartDate': '',
      'presentationCodeId': '',
      'pricingCategoryName': '',
      'pricingRuleSites': []
    }];
  }

  // submitProject() {
  //   console.log(JSON.stringify(this.configuratorDiscountDataService.addEditDiscountSubmitData));

  //   let reqObj: SubmitDiscountInfo;
  //   reqObj = {
  //     'descriptionBuilder': this.discountsDescriptionBuilder,
  //     'discountIcomsStatus': this.discountIcomsForms,
  //     'discountGift': this.discountGift,
  //     'discMapPreRequisite': this.discMapPreRequisite,
  //     'discMapOscar': this.discMapOscar,
  //     'disMapMainPage': this.disMapMainPage,
  //     'discMapOnline': this.discMapOnline,
  //     'mappingTable': this.mappingTable,
  //     'discountFormDropDown': this.discountFormDropDown
  //   }
  //   this.discountService.submitProject(reqObj).subscribe(
  //     data => {
  //  this.openDialog();
  //    },
  //     error => {
  //       console.log('Error :: ' + error)
  //     }
  //   );
  // }

  returnBack() {
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

}

@Component({
  selector: 'plm-discount-confirmation-dialog',
  templateUrl: './discount-confirmation-dialog.html'
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

}



@Component({
  selector: 'plm-discount-submit-success-dialog',
  templateUrl: '../discount-details/discount-submit-success-dialog.html'
})
export class SubmitSuccessDialogComponent {
  private discountCode: String;
  constructor(
    public dialogRef: MatDialogRef<SubmitSuccessDialogComponent>, private router: Router, private configuratorDiscountDataService: ConfiguratorDiscountDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.discountCode = this.configuratorDiscountDataService.addEditViewDiscountCode;

  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  moveToDiscountList() {
    this.dialogRef.close();
    this.configuratorDiscountDataService.addEditViewDiscountCode = '';
    this.configuratorDiscountDataService.addEditViewDiscountMode = '';
    this.configuratorDiscountDataService.isAddEditDiscountModified = false;
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

}


@Component({
  selector: 'plm-discount-save-success-dialog',
  templateUrl: '../discount-details/discount-save-success-dialog.html'
})
export class SaveSuccessDialogComponent {
  private discountCode: String;
  constructor(
    public dialogRef: MatDialogRef<SaveSuccessDialogComponent>, private router: Router, private configuratorDiscountDataService: ConfiguratorDiscountDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.discountCode = this.configuratorDiscountDataService.addEditViewDiscountCode;
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  moveToDiscountList() {
    this.dialogRef.close();
    this.configuratorDiscountDataService.addEditViewDiscountCode = '';
    this.configuratorDiscountDataService.addEditViewDiscountMode = '';
    this.configuratorDiscountDataService.isAddEditDiscountModified = false;
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

}

@Component({
  selector: 'plm-discount-exit-form-error-dialog',
  templateUrl: '../discount-details/discount-exit-form-error-dialog.html'
})
export class ExitFormErrorDialogComponent {
  private discountCode: String;
  constructor(
    public dialogRef: MatDialogRef<ExitFormErrorDialogComponent>, private router: Router, private configuratorDiscountDataService: ConfiguratorDiscountDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.discountCode = this.configuratorDiscountDataService.addEditViewDiscountCode;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDiscountList() {
    this.dialogRef.close();
    this.configuratorDiscountDataService.addEditViewDiscountCode = '';
    this.configuratorDiscountDataService.addEditViewDiscountMode = '';
    this.configuratorDiscountDataService.isAddEditDiscountModified = false;
    this.router.navigate(['/plm-work-flow/configurator/discount/discount-code-list']);
  }

  cancelExit() {
    this.dialogRef.close();
  }



}
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GetGeneralInfoInterfaceResponse, Records, OfferFormDropDown, OfferFormMasterData, GetofferFromProjectResponse, OfferProdMapTxnDets, OfferCreationResponse, Products, Discounts, EligiblityRules, RelevancyRules, OfferDiscMapTxnDets, OfferRelRuleTxnDets, OfferEligRuleTxnDets, OfferPinpointTxnDets, OffrEcommPinpntTxnDets } from './add-offer-interface';
import { AddOfferService } from './add-offer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfiguratorDataService } from '../../configurator-data.service';

@Component({
  selector: 'plm-add-offer',
  templateUrl: './add-offer.component.html',
  providers: [AddOfferService]
})
export class AddOfferComponent implements OnInit {

  private key: string;
  private reverse: boolean;
  private showSearch: boolean;
  private masterData: OfferFormMasterData;
  private offerFormDropDown: OfferFormDropDown;
  private offerFromProject: GetofferFromProjectResponse;
  private offerGeneralInfo: GetGeneralInfoInterfaceResponse;
  private offerProductAssInfo: OfferProdMapTxnDets[];
  private offerDiscountAssInfo: OfferDiscMapTxnDets[];
  private offerEligiblityRulesInfo: OfferEligRuleTxnDets[];
  private offerRelevancyRulesInfo: OfferRelRuleTxnDets[];
  private offerPricingPinPointInfo: OfferPinpointTxnDets[];
  private offerECOMMPinPointInfo: OffrEcommPinpntTxnDets[];
  private showAddOfferSection: Boolean;


  constructor(private addOfferService: AddOfferService, private router: Router, public dialog: MatDialog, private configuratorDataService: ConfiguratorDataService) {
    this.initializeOfferFormDropDown();
    this.getConfiguratorFormData();
    this.getConfiguratorOfferFromProject();
    this.showAddOfferSection = false;
    this.configuratorDataService.configuratorOfferModel = {};
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogInfo, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogs(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogSuccess, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getConfiguratorFormData() {
    this.addOfferService.getConfiguratorMasterFormDropDown()
      .subscribe(
        data => {
          this.masterData = data;
          this.populateFormFieldValues();
          this.showHideAddOfferSection();
        },
        error => {
          console.log("Error :: " + error)
        }
      );
  }

  getConfiguratorOfferFromProject() {
    this.addOfferService.getConfiguratorOfferFromProject()
      .subscribe(
        data => {
          this.configuratorDataService.configuratorOfferModel.offerModel = data.offerModel;
          this.offerFromProject = data.offerModel.mrktingOfferTxnDet;
          this.offerGeneralInfo = data.offerModel.generalInfoMapTxnDet;
          this.offerProductAssInfo = data.offerModel.offerProdMapTxnDets;
          this.offerDiscountAssInfo = data.offerModel.offerDiscMapTxnDets;
          this.offerEligiblityRulesInfo = data.offerModel.offerEligRuleTxnDets;
          this.offerRelevancyRulesInfo = data.offerModel.offerRelRuleTxnDets;
          this.offerPricingPinPointInfo = data.offerModel.offerPinpointTxnDet;
          this.offerECOMMPinPointInfo = data.offerModel.offrEcommPinpntTxnDet;
          this.showHideAddOfferSection();
        },
        error => {
          console.log("Error :: " + error)
        }
      );
  }




  ngOnInit() {

  }

  populateFormFieldValues() {
    for (let i = 0; i < this.masterData.commonMasterData.length; i++) {
      const currentMasterData = this.masterData.commonMasterData[i];
      this.offerFormDropDown[currentMasterData.name] = currentMasterData.records;
    }
    this.offerFormDropDown['PRODUCTS'] = this.masterData.products;
    this.offerFormDropDown['DISCOUNTS'] = this.masterData.discounts;
    for (let j = 0; j < this.offerFormDropDown['DISCOUNTS'].length; j++) {
      this.offerFormDropDown['DISCOUNTS'][j].campaignCode = this.getCampaignCodes(this.offerFormDropDown['DISCOUNTS'][j]['discountCode']);
    }
    this.offerFormDropDown['ELIGIBILITY_RULES'] = this.masterData.eligibilityRules;
    this.offerFormDropDown['RELEVANCY_RULES'] = this.masterData.relevancyRules;
  }

  getCampaignCodes(discountCode) {
    let result = '';
    for (let z = 0; z < this.offerFormDropDown.campaignCodesList.length; z++) {
      if (this.offerFormDropDown.campaignCodesList[z].key == discountCode) {
        result = this.offerFormDropDown.campaignCodesList[z].value;
        break;
      }
    }
    return result;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  initializeOfferFormDropDown() {
    this.offerFormDropDown = {
      'PINPOINT_STATUS': [],
      'CHANNELSLABEL': [],
      'ADDON_TYPE': [],
      'DVR': [],
      'DATAEQUIP': [],
      'VIDEOEQUIP': [],
      'PSU_INSTL_TYPE': [],
      'PSU_BASE_OFFER_ELIGI': [],
      'RATEGRP_EXCLUSIONLIST': [],
      'STATICINTENTLIST': [],
      'STATICSUBINTENTLIST': [],
      'PAYLAUNCHMODE': [],
      'ECOM_PINPOINT_STATUS': [],
      'BUNDLE_MASTER': [],
      'OFFER_CATEGORY_MASTER': [],
      'STATUS_MASTER': [],
      "SITES": [],
      "DISCOUNTS": [],
      "PRODUCTS": [],
      "MARKETS": [],
      "campaignCodesList": []
    }
  }

  showHideAddOfferSection() {
    if ((typeof this.masterData != 'undefined') &&
      (typeof this.offerFromProject != 'undefined') &&
      (typeof this.offerGeneralInfo != 'undefined') &&
      (typeof this.offerProductAssInfo != 'undefined') &&
      (typeof this.offerDiscountAssInfo != 'undefined') &&
      (typeof this.offerEligiblityRulesInfo != 'undefined') &&
      (typeof this.offerRelevancyRulesInfo != 'undefined')) {
      this.showAddOfferSection = true;
    }
  }

  submitOffer() {
    this.addOfferService.submitProject().subscribe(
      data => {
        this.openDialog();
      },
      error => {
        console.log("Error :: " + error)
      }
    );
  }


  saveExitOffer() {
    this.addOfferService.saveExitProject().subscribe(
      data => {
        this.openDialogs();
      },
      error => {
        console.log("Error :: " + error)
      }
    );
  }

  returnBack() {
    this.router.navigate(['plm-work-flow/configurator/offer/offer-table']);
  }
}

@Component({
  selector: 'add-offer-confirmation-dialog',
  templateUrl: '../add-offer/add-offer-confirmation-dialog.html'
})
export class DialogOverviewExampleDialogInfo {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogInfo>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['plm-work-flow/configurator/offer/offer-table']);
  }

}


@Component({
  selector: 'add-offer-confirmation-dialog',
  templateUrl: '../add-offer/add-offer-success-validation.html'
})
export class DialogOverviewExampleDialogSuccess {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogSuccess>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToDashboard() {
    this.dialogRef.close();
    this.router.navigate(['plm-work-flow/configurator/offer/offer-table']);
  }

}



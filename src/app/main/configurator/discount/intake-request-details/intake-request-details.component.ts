import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IntakeRequestMasterData, IntakeRequestForm, ProjectMasterModel, IntakeRequestFormIntakeForm, 
  AddProjectMasterData } from '../../../requestor/requestor.interface';
import { RequestorService } from '../../../requestor/services/requestor.service'
import { RequestorDataService } from '../../../requestor/services/requestor-data.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { ConfiguratorDiscountDataService } from '../../discount/services/configurator-discount-data.service';


@Component({
  selector: 'plm-intake-request-details',
  templateUrl: './intake-request-details.component.html',
  styleUrls: ['./intake-request-details.component.css'],
    providers: [RequestorService, UtilitiesService]
})
export class IntakeRequestDetailsComponent implements OnInit {
  private addEditMode: string;
  private capitalizedAddEdiitMode: string;
  private addEditIntakeRequestProjectID: String;
  private discountProjectCode: String;
  private intakeRequestSubmitFailed: Boolean;
  private saveAndExitSuccess: Boolean;
  private saveAndExitFail: Boolean;
  private addEditIntakeRequestForm: IntakeRequestForm;
  private addEditIntakeRequestMasterData: IntakeRequestMasterData;
  private fileToUpload: any;

  constructor(private configuratorDiscountDataService:ConfiguratorDiscountDataService, private router: Router, private requestorService: RequestorService, private requestorDataService: RequestorDataService, private utilitiesService: UtilitiesService) {
    this.getAddEditIntakeRequestMasterData();
    this.addEditMode = 'view';
    this.discountProjectCode = this.configuratorDiscountDataService.discountProjectCode;
    this.addEditIntakeRequestProjectID = this.configuratorDiscountDataService.discountProjectCode;
    this.capitalizedAddEdiitMode = this.utilitiesService.capitalizeFirstLetter(this.addEditMode);
    this.intakeRequestSubmitFailed = false;
    this.saveAndExitFail = false;
    this.saveAndExitSuccess = false;
    this.intializeIntakeRequestForm();
    // if (this.addEditMode != 'add') {
      this.fetchEditProjectData();
    // }
    this.fileToUpload = null;
   }

  ngOnInit() {
  }

   getAddEditIntakeRequestMasterData() {
    this.requestorService.getCreateUpdateIntakeRequestFormData().subscribe(
      data => {
        this.addEditIntakeRequestMasterData = data;
        this.requestorDataService.addEditIntakeRequestMasterData = data;
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }

  intializeIntakeRequestForm() {
    this.addEditIntakeRequestForm = {
      'isSubmitted': false,
      'projectMasterModel': this.intializeIntakeProjectMasterModel()
    }
    this.requestorDataService.addEditIntakeRequestForm = this.addEditIntakeRequestForm;
  }
  
  intializeIntakeProjectMasterModel() {
    let intakeRequestMasterForm: ProjectMasterModel;
    intakeRequestMasterForm = {
      'projectCode': '',
      'projectTypeId': '',
      'projectStartDt': '',
      'projectEndDt': '',
      'intakeReqName': '',
      'intakeRequestStatusId': '',
      'pricingOwnerId': '',
      'requesterName': '',
      'pricingOwnerNotes': '',
      'requesterEmail': '',
      'trgtAudienceId': '',
      'popsNotes': '',
      'channelIds': [],
      'categoryId': '',
      'addUptierPaths': '',
      'productIds': [],
      'priorityId': '',
      'sites': [],
      'description': '',
      'uploadIntakeRequestDoc': null,
      'uploadIntakeRequestDocId': '',
      'uploadIntakeRequestDocName': '',
      'intakeFormReqTxnDetModel': this.intializeIntakeRequestFormIntakeForm()
    };
    return intakeRequestMasterForm;
  }

  intializeIntakeRequestFormIntakeForm() {
    let intakeRequestIntakeForm: IntakeRequestFormIntakeForm;
    intakeRequestIntakeForm = {
      'campCodeIds': [],
      'stepupDuratnId': '',
      'stepupAmount': '',
      'discountStartDate': '',
      'discountExpireDate': '',
      'durationMonths': '',
      'requirePlgId': '',
      'prodMustInc': '',
      'prodMustExc': '',
      'prodMustRetainInc': '',
      'prodMustRetainExc': '',
      'instltnIncFlg': false,
      'instltnIncFlgVal': false,
      'instltnPricing': '',
      'prodMustInstlExc': '',
      'tireqIds': []
    };
    return intakeRequestIntakeForm
  }

  fetchEditProjectData() {
    this.requestorService.getEditProjectData(this.addEditIntakeRequestProjectID).subscribe(
      data => {
        this.addEditIntakeRequestForm = data;
        this.requestorDataService.addEditIntakeRequestForm = this.addEditIntakeRequestForm;
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }
  
  // submitIntakeRequest() {
  
  //   if (this.requestorDataService.addEditViewIntakeRequestMode == 'add') {
  //     this.intakeRequestAdd('submit');
  //   } else if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
  //     this.intakeRequestUpdate('submit');
  //   }
  // }

  // intakeRequestAdd(mode) {
  //   this.requestorDataService.addEditIntakeRequestForm.isSubmitted = (mode == 'submit') ? true : false;
  //   this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.uploadIntakeRequestDoc = this.fileToUpload;
  //   this.requestorService.postAddProjectDetails(this.requestorDataService.addEditIntakeRequestForm).subscribe(
  //     data => {
  //       if (data.actionStatus == 'SUCCESS') {
  //         this.requestorDataService.addEditViewIntakeRequestID = data.projectMasterModel.projectCode;
  //       } else if (data.actionStatus == 'FAIL') {
  //         this.showErrorMessage(mode);
  //       }
       
  //     },
  //     error => {
  //       console.log('Error :: ' + error);
       
  //     }
  //   );
  // }

  // intakeRequestUpdate(mode) { 
  //   this.requestorDataService.addEditIntakeRequestForm.isSubmitted = (mode == 'submit') ? true : false;
  //   this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.uploadIntakeRequestDoc = this.fileToUpload;
  //   this.requestorService.postUpdateProjectDetails(this.requestorDataService.addEditIntakeRequestForm, this.addEditIntakeRequestProjectID).subscribe(
  //     data => {
  //       if (data.actionStatus == 'SUCCESS') {
  //         this.requestorDataService.addEditViewIntakeRequestID = data.projectMasterModel.projectCode;
  //       } else if (data.actionStatus == 'FAIL') {
  //         this.showErrorMessage(mode);
  //       }
        
  //     },
  //     error => {
  //       console.log('Error :: ' + error);
        
  //     }
  //   );
  // }

  // saveAndExit() {
    
  //   if (this.requestorDataService.addEditViewIntakeRequestMode == 'add') {
  //     this.intakeRequestAdd('save');
  //   } else if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
  //     this.intakeRequestUpdate('save');
  //   }
  // }

  redirectBack(url) {
    if (this.requestorDataService.isAddEditIntakeRequestFormModified) {
      
      return;
    }
    this.router.navigate([url]);
  }

  showErrorMessage(mode) {
    if (mode == 'submit') {
      this.intakeRequestSubmitFailed = true;
    } else if (mode == 'save') {
      this.saveAndExitFail = true;
    }
  }

  
  validateIntakeForm() {
    alert("inside form")
    let result = true;
    let validFormFields = ['projectTypeId', 'projectStartDt', 'projectEndDt'];
    if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
      validFormFields.push('projectCode');
    }
    for (let i=0; i < validFormFields.length; i++) {
      if (validFormFields[i] == '') {
        result = true;
        break;
      }
    }
    return true;
  }
  onFileUpload(fileUpload: any): void{
    this.fileToUpload = fileUpload;
 }

}


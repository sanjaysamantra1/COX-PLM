import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IntakeRequestMasterData, IntakeRequestForm, ProjectMasterModel, IntakeRequestFormIntakeForm, AddProjectMasterData } from '../requestor.interface';
import { RequestorService } from '../services/requestor.service';
import { RequestorDataService } from '../services/requestor-data.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'plm-intake-request-details',
  templateUrl: './intake-request-details.component.html',
  styleUrls: ['./intake-request-details.component.css'],
  providers: [RequestorService, UtilitiesService]
})
export class IntakeRequestDetailsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  private addEditMode: string;
  private capitalizedAddEdiitMode: string;
  private addEditIntakeRequestProjectID: string;
  private intakeRequestSubmitFailed: Boolean;
  private saveAndExitSuccess: Boolean;
  private saveAndExitFail: Boolean;
  private addEditIntakeRequestForm: IntakeRequestForm;
  private addEditIntakeRequestMasterData: IntakeRequestMasterData;
  private fileToUpload: any;

  constructor(private router: Router, private requestorService: RequestorService, private requestorDataService: RequestorDataService, private utilitiesService: UtilitiesService, public dialog: MatDialog) {
    this.getAddEditIntakeRequestMasterData();
    this.addEditMode = this.requestorDataService.addEditViewIntakeRequestMode;
    this.addEditIntakeRequestProjectID = this.requestorDataService.addEditViewIntakeRequestID;
    this.capitalizedAddEdiitMode = this.utilitiesService.capitalizeFirstLetter(this.addEditMode);
    this.intakeRequestSubmitFailed = false;
    this.saveAndExitFail = false;
    this.saveAndExitSuccess = false;
    this.intializeIntakeRequestForm();
    if (this.addEditMode != 'add') {
      this.fetchEditProjectData();
    }
    this.fileToUpload = null;
    this.blockUI.start('Loading Intake Request Details...');
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


  openSubmitSuccessDialog(): void {
    let dialogRef = this.dialog.open(SubmitSuccessDialog, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openSaveSuccessDialog(): void {
    let dialogRef = this.dialog.open(SaveSuccessDialog, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openExitErrorDialog(): void {
    let dialogRef = this.dialog.open(ExitFormErrorDialog, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  submitIntakeRequest() {
    this.blockUI.start('Submitting Intake Request...');
    if (this.requestorDataService.addEditViewIntakeRequestMode == 'add') {
      this.intakeRequestAdd('submit');
    } else if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
      this.intakeRequestUpdate('submit');
    }
  }

  intakeRequestAdd(mode) {
    this.requestorDataService.addEditIntakeRequestForm.isSubmitted = (mode == 'submit') ? true : false;
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.uploadIntakeRequestDoc = this.fileToUpload;
    this.requestorService.postAddProjectDetails(this.requestorDataService.addEditIntakeRequestForm).subscribe(
      data => {
        if (data.actionStatus == 'SUCCESS') {
          this.requestorDataService.addEditViewIntakeRequestID = data.projectMasterModel.projectCode;
          this.showSaveSubmitDialog(mode);
        } else if (data.actionStatus == 'FAIL') {
          this.showErrorMessage(mode);
        }
        this.blockUI.stop();
      },
      error => {
        console.log('Error :: ' + error);
        this.blockUI.stop();
      }
    );
  }

  intakeRequestUpdate(mode) {
    this.requestorDataService.addEditIntakeRequestForm.isSubmitted = (mode == 'submit') ? true : false;
    this.requestorDataService.addEditIntakeRequestForm.projectMasterModel.uploadIntakeRequestDoc = this.fileToUpload;
    this.requestorService.postUpdateProjectDetails(this.requestorDataService.addEditIntakeRequestForm, this.addEditIntakeRequestProjectID).subscribe(
      data => {
        if (data.actionStatus == 'SUCCESS') {
          this.requestorDataService.addEditViewIntakeRequestID = data.projectMasterModel.projectCode;
          this.showSaveSubmitDialog(mode);
        } else if (data.actionStatus == 'FAIL') {
          this.showErrorMessage(mode);
        }
        this.blockUI.stop();
      },
      error => {
        console.log('Error :: ' + error);
        this.blockUI.stop();
      }
    );
  }

  saveAndExit() {
    this.blockUI.start('Saving Intake Request...');
    if (this.requestorDataService.addEditViewIntakeRequestMode == 'add') {
      this.intakeRequestAdd('save');
    } else if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
      this.intakeRequestUpdate('save');
    }
  }

  redirectBack(url) {
    if (this.requestorDataService.isAddEditIntakeRequestFormModified) {
      this.openExitErrorDialog();
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

  showSaveSubmitDialog(mode) {
    if (mode == 'submit') {
      this.openSubmitSuccessDialog();
    } else if (mode == 'save') {
      this.openSaveSuccessDialog();
    }
  }

  validateIntakeForm() {
    let disableBtn = true;
    console.log(this.addEditIntakeRequestForm.projectMasterModel.projectTypeId);
    console.log(this.addEditIntakeRequestForm.projectMasterModel.projectStartDt);
    console.log(this.addEditIntakeRequestForm.projectMasterModel.projectEndDt);
    /*let validFormFields = ['projectTypeId', 'projectStartDt', 'projectEndDt'];
    if (this.requestorDataService.addEditViewIntakeRequestMode == 'edit') {
      validFormFields.push('projectCode');
    }
    for (let i=0; i < validFormFields.length; i++) {
      if (validFormFields[i] == '') {
        result = true;
        break;
      }
    }*/
    if (this.addEditIntakeRequestForm.projectMasterModel.projectTypeId && this.addEditIntakeRequestForm.projectMasterModel.projectStartDt && this.addEditIntakeRequestForm.projectMasterModel.projectEndDt) {
      disableBtn = false
    }
    return disableBtn;
  }


  onFileUpload(fileUpload: any): void {
    this.fileToUpload = fileUpload;
  }

}


@Component({
  selector: 'submit-success-dialog',
  templateUrl: './submit-success-dialog.html'
})
export class SubmitSuccessDialog {
  private projectCode: string;
  constructor(
    public dialogRef: MatDialogRef<SubmitSuccessDialog>, private router: Router, private requestorDataService: RequestorDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectCode = this.requestorDataService.addEditViewIntakeRequestID;
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  moveToProjectList() {
    this.dialogRef.close();
    this.requestorDataService.addEditViewIntakeRequestID = '';
    this.requestorDataService.addEditViewIntakeRequestMode = '';
    this.requestorDataService.isAddEditIntakeRequestFormModified = false;
    this.router.navigate(['plm-work-flow/requestor/intake-request-list']);
  }

}


@Component({
  selector: 'save-success-dialog',
  templateUrl: './save-success-dialog.html'
})
export class SaveSuccessDialog {
  private projectCode: string;
  constructor(
    public dialogRef: MatDialogRef<SaveSuccessDialog>, private router: Router, private requestorDataService: RequestorDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectCode = this.requestorDataService.addEditViewIntakeRequestID;
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }

  moveToProjectList() {
    this.dialogRef.close();
    this.requestorDataService.addEditViewIntakeRequestID = '';
    this.requestorDataService.addEditViewIntakeRequestMode = '';
    this.requestorDataService.isAddEditIntakeRequestFormModified = false;
    this.router.navigate(['plm-work-flow/requestor/intake-request-list']);
  }

}

@Component({
  selector: 'exit-form-error-dialog',
  templateUrl: './exit-form-error-dialog.html'
})
export class ExitFormErrorDialog {
  private projectCode: string;
  constructor(
    public dialogRef: MatDialogRef<ExitFormErrorDialog>, private router: Router, private requestorDataService: RequestorDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectCode = this.requestorDataService.addEditViewIntakeRequestID;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  moveToProjectList() {
    this.dialogRef.close();
    this.requestorDataService.addEditViewIntakeRequestID = '';
    this.requestorDataService.addEditViewIntakeRequestMode = '';
    this.requestorDataService.isAddEditIntakeRequestFormModified = false;
    this.router.navigate(['plm-work-flow/requestor/intake-request-list']);
  }

  cancelExit() {
    this.dialogRef.close();
  }



}
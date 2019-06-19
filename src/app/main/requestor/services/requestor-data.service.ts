import { Injectable, EventEmitter } from '@angular/core';
import { IntakeRequestMasterData, RequestorResponseInterface, ViewAddMrktingOfferModel, IntakeRequestForm, IntakeRequestFormIntakeForm } from '../requestor.interface';

@Injectable()
export class RequestorDataService {
  public createPSUProjectID: string;
  public addMarketingFormData: ViewAddMrktingOfferModel;
  public createViewProjectID: string;
  public createProjectForm: RequestorResponseInterface;
  public createProjectFormUpdated: any;
  public psuTypes: any;

  public addEditViewIntakeRequestID: string;
  public addEditViewIntakeRequestMode: string;
  public addEditIntakeRequestMasterData: IntakeRequestMasterData;
  public addEditIntakeRequestForm: IntakeRequestForm;
  public isAddEditIntakeRequestFormModified: Boolean;

  public rolesMatrix: any;

  public constructor() {
    this.createProjectFormUpdated  = new EventEmitter();
  }
   
  setCreateProjectForm(formData) {
    this.createProjectForm = formData;
    this.createProjectFormUpdated.emit(this.createProjectForm);
  }

  getCreateProjectForm() {
    return this.createProjectForm;
  }

}

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfigService } from '../../../shared/services/app-config.service';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { AddUpdateIntakeRequestSubmitSaveResponse, IntakeRequestMasterData, RequestorResponseInterface, AddUpdateProjectResponse, ViewMarketingProjResponse } from '../requestor.interface';
import { saveFile } from '../../../shared/services/file-download-helper.service';
import * as FileSaver from 'file-saver';
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable()
export class RequestorService {
    private breadCrumbs: BreadCrumb[];

    public constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService
    ) {}

    getBreadCrumbs(): BreadCrumb[] {
        return [
            { name: 'Home', url: 'dashboard' },
            { name: ' PLM Work Flow ', url: '' },
            { name: 'Requestor', url: '' }
        ];
    }

    downloadFile(api: string, fileName: string) {
    }

    getCreateUpdateIntakeRequestFormData(): Observable<IntakeRequestMasterData> {
        const getCreateUpdateProjectFormDataURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_ADD_NEW_PROJECT_FORM'];
        return this.http
          .get(getCreateUpdateProjectFormDataURL)
          .map((response: any) => {
            return response;
          })
          .catch(this.handleError);
        // const getUserDetailsURL = this.appConfigService.urlConstants[
        //     'PLM_ADD_NEW_PROJECT_FORM'
        // ];
        // return this.http
        //     .get(getUserDetailsURL)
        //     .map((response: Response) => {
        //         return response;
        //     })
        //     .catch(this.handleError);
    }

    getEditProjectData(projectCode){
        const getViewProjectData = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_UPDATE_PROJECT'] +'/'+projectCode;
        return this.http
          .get(getViewProjectData)
          .map((response: any) => {
            return response;
          })
          .catch(this.handleError);
        // const getUpdateProjectURL = this.appConfigService.urlConstants[
        //     'PLM_UPDATE_PROJECT'
        // ];
        // return this.http
        //     .get(getUpdateProjectURL)
        //     .map((response: Response) => {
        //         return response;
        //     })

        //     .catch(this.handleError);
    }

    getViewProjectData(reqObj) {
        const getViewProjectData = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_VIEW_PROJECT'];
        return this.http
          .get(getViewProjectData, reqObj)
          .map((response: any) => {
            return response;
          })
          .catch(this.handleError);
        // const getUpdateProjectURL = this.appConfigService.urlConstants[
        //     'PLM_VIEW_PROJECT'
        // ];
        // return this.http
        //     .get(getUpdateProjectURL)
        //     .map((response: Response) => {
        //         return response;
        //     })

        //     .catch(this.handleError);
    }

    getAllIntakeRequestDetails(): Observable<any> {
        const getProjectDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_PROJECT_DETAILS'];
        return this.http
          .get(getProjectDetailsURL)
          .map((response: any) => {
            return response;
          })
          .catch(this.handleError);
        // const getProjectDetailsURL = this.appConfigService.urlConstants[
        //     'PLM_PROJECT_DETAILS'
        // ];
        // return this.http
        //     .get(getProjectDetailsURL)
        //     .map((response: Response) => {
        //         return response;
        //     })
        //     .catch(this.handleError);
    }

    postAddProjectDetails(reqObj):Observable<AddUpdateIntakeRequestSubmitSaveResponse>{
        const postAddProjectDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_ADD_PROJECT'];
        let headersVal = new Headers();
        headersVal.append('Content-Type', '');
        return this.http
          .post(postAddProjectDetailsURL,  this.prepareSave(reqObj)) 
          .map((response: Response) => {
            return response;
          })
          .catch(this.handleError);
        // const getAddUpdateProject = this.appConfigService.urlConstants[
        //     'PLM_ADD_UPDATE_PROJECT_RESPONSE'
        // ];
        // return this.http
        //     .get(getAddUpdateProject)
        //     .map((response: Response) => {
        //         return response;
        //     })
        //     .catch(this.handleError);
    }

    
    postUpdateProjectDetails(reqObj, projectCode):Observable<AddUpdateIntakeRequestSubmitSaveResponse>{
        // reqObj.projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlg = this.getInstallationIncluded(reqObj.projectMasterModel); 
        const putUpdateProjectDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_UPDATE_PROJECT'] +'/'+projectCode;
        return this.http
          .put(putUpdateProjectDetailsURL, reqObj)
          .map((response: Response) => {
            return response;
          })
          .catch(this.handleError);
        // const getAddUpdateProject = this.appConfigService.urlConstants[
        //     'PLM_ADD_UPDATE_PROJECT_RESPONSE'
        // ];
        // this.prepareSave(reqObj);
        // return this.http
        //     .get(getAddUpdateProject)
        //     .map((response: Response) => {
        //         return response;
        //     })

        //     .catch(this.handleError);
    }

    private prepareSave(reqObj): any {
        let input = new FormData();
        let projectMasterModel = JSON.parse(JSON.stringify(reqObj.projectMasterModel));
        delete projectMasterModel.uploadIntakeRequestDoc;
        // projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlg = this.getInstallationIncluded(projectMasterModel); 
        delete projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlgVal;
        if (reqObj.projectMasterModel.uploadIntakeRequestDoc) {
            input.append('file', reqObj.projectMasterModel.uploadIntakeRequestDoc, reqObj.projectMasterModel.uploadIntakeRequestDoc.name);
        } 
        let dataObj = {
            'projectMasterModel': projectMasterModel,
            'isSubmitted': reqObj.isSubmitted
        };
        input.append('data', JSON.stringify(dataObj));
        return input;
    }

 

    private getInstallationIncluded(projectMasterModel) {
        if (projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlgVal) {
            return JSON.parse(JSON.stringify(projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlgVal)); 
        } else {
            return ((projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlg === 'Y') ? 'true' : 'false');
        }
    }

    private getHeaders(): any {
        var headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/json');
        return headers;
    }

    getPSUTypes(){
        // const getPSUTypes = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_PSU_TYPES_MASTER_DATA'];
        // return this.http
        //   .get(getPSUTypes)
        //   .map((response: any) => {
        //     return response;
        //   })
        //   .catch(this.handleError);
        const getPSUTypesURL = this.appConfigService.urlConstants[
            'PLM_PSU_TYPES_MASTER_DATA'
        ];
        return this.http
            .get(getPSUTypesURL)
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getSingleSelectID(selectedItems) {
        return (selectedItems[0]['id'].toString());
    }

    getMultiSelectID(selectedItems) {
        let result = [];
        for(let i=0; i< selectedItems.length; i++) {
        result.push((selectedItems[i]['id']).toString());
        }
        return result;
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}

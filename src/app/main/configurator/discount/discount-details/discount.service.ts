import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfigService } from '../../../../shared/services/app-config.service';
import {
  //GetDescriptionBuilder,
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
  GetDiscountGeneralInformation
} from './discount-interface';


@Injectable()
export class DiscountService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }



  getAddDiscountMasterData():Observable<any> {
    const getAddDiscountMasterDataUrl = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_ADD_DISCOUNT_MASTER_DATA'];
    return this.http
      .get(getAddDiscountMasterDataUrl)
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
    // const getAddDiscountMasterDataUrl = this.appConfigService.urlConstants['PLM_ADD_DISCOUNT_MASTER_DATA'];
    // return this.http
    //   .get(getAddDiscountMasterDataUrl)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }

  getPriceBookData():Observable<any> {
    const getAddDiscountMasterDataUrl = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_ADD_DISCOUNT_PRICING_RULES'];
    return this.http
      .get(getAddDiscountMasterDataUrl)
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
    // const getAddDiscountPricingRulesUrl = this.appConfigService.urlConstants['PLM_ADD_DISCOUNT_PRICING_RULES'];
    // return this.http
    //   .get(getAddDiscountPricingRulesUrl)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }

  getEditDiscountFormData(discountCode):Observable<any> {
     const getEditDiscountFormDataUrl = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_EDIT_DISCOUNT_FORM_DATA'] + '/' +discountCode;
      return this.http
      .get(getEditDiscountFormDataUrl)
      .map((response: any) => {
        return response;
      })
      .catch(this.handleError);
    // const getEditDiscountFormDataUrl = this.appConfigService.urlConstants['PLM_EDIT_DISCOUNT_FORM_DATA'];
    // return this.http
    //   .get(getEditDiscountFormDataUrl)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }

  getIcomsStatus(): Observable<any> {
    const getIcomsStatus = this.appConfigService.urlConstants['PLM_DISCOUNT_MASTER_ICOMS_STATUS']
    return this.http
      .get(getIcomsStatus)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  postAddDiscountDetails(submitData, file, isSubmitted):Observable<any>{
      const postAddDiscountDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_SUBMIT_DISCOUNT_FORM_DATA'];
      let headersVal = new Headers();
      headersVal.append('Content-Type', '');
      return this.http
        .post(postAddDiscountDetailsURL,  this.prepareSave(submitData, file, isSubmitted)) 
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
  
  
  postUpdateDiscountDetails(submitData, file, isSubmitted):Observable<any>{
      // reqObj.projectMasterModel.intakeFormReqTxnDetModel.instltnIncFlg = this.getInstallationIncluded(reqObj.projectMasterModel); 
      const putUpdateDiscountDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_SUBMIT_DISCOUNT_FORM_DATA'];
      return this.http
        .put(putUpdateDiscountDetailsURL,  this.prepareSave(submitData, file, isSubmitted))
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
  
  private prepareSave(submitData, file, isSubmitted): any {
      let input = new FormData();
      let submitDataModel = JSON.parse(JSON.stringify(submitData));
      if (file) {
          input.append('file', file, file.name);
      } 
      let dataObj = {
          'discount': submitDataModel,
          'submitted': isSubmitted
      };
      input.append('data', JSON.stringify(dataObj));
      return input;
  }


  submitProject(reqObj): Observable<any> {
    const getDiscountCreationURL = this.appConfigService.protocol + '://' + this.appConfigService.host + ':' + this.appConfigService.port + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_DISCOUNTSTATUS'];
    return this.http
      .post(getDiscountCreationURL, reqObj)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
    // const submitAddDiscount = this.appConfigService.urlConstants['PLM_SUBMIT_DISCOUNT_FORM_DATA']
    // return this.http
    //   .get(submitAddDiscount)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }


  getDiscountFormData(): Observable<any> {
    
    const getDiscountFormData = this.appConfigService.urlConstants['PLM_DISCOUNT_ICOMS_STATUS']
    return this.http
      .get(getDiscountFormData)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { BreadCrumb } from '../../../../shared/services/bread-crumb';
import { AppConfigService } from '../../../../shared/services/app-config.service';
import { GetGeneralInfoInterfaceResponse, Records, OfferFormDropDown, OfferFormMasterData } from './add-offer-interface';
import { ConfiguratorDataService } from '../../configurator-data.service';

@Injectable()
export class AddOfferService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService, private configuratorDataService: ConfiguratorDataService) { }

  
  getConfiguratorMasterFormDropDown(): Observable<any>{
    // const getConfiguratorMasterData = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_CREATION_MASETR_DROPDOWN'];
    const getConfiguratorMasterData = this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_CREATION_MASETR_DROPDOWN'];
    return this.http
      .get(getConfiguratorMasterData)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getConfiguratorOfferFromProject(): Observable<any>{
    // let getConfiguratorOfferFromProjectUrl = '';
    // if (this.configuratorDataService.isAddoffer) {
    //   getConfiguratorOfferFromProjectUrl = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_ADD_OFFER'] + '/' + this.configuratorDataService.marketingOfferIDToAddOffer ;
    // } else if (this.configuratorDataService.isModifyOffer) {
    //   getConfiguratorOfferFromProjectUrl = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_MODIFY_OFFER'] + '/' + this.configuratorDataService.offerIDToModify ;
    // } 
    // return this.http
    //   .get(getCreateUpdateProjectFormDataURL)
    //   .map((response: any) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getConfiguratorOfferFromProjectUrl = this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_CREATION'];
    return this.http
      .get(getConfiguratorOfferFromProjectUrl)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  submitProject(): Observable<any> {
    // const getDiscountCreationURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_SUBMIT_OFFER'];
    const reqObj = this.configuratorDataService.configuratorOfferModel;
    // return this.http
    //   .post(getDiscountCreationURL, reqObj)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getConfiguratorOfferFromProject = this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_CREATION']
    return this.http
      .get(getConfiguratorOfferFromProject)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }
  
  saveExitProject(): Observable<any> {
    // const getDiscountCreationURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_SAVE_EXIT_OFFER'];
    const reqObj = this.configuratorDataService.configuratorOfferModel;
    // return this.http
    //   .post(getDiscountCreationURL, reqObj)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getConfiguratorOfferFromProject = this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_CREATION']
    return this.http
      .get(getConfiguratorOfferFromProject)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
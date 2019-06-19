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
import { GetDiscountListResponse } from './discount--codes-list.interface';
import { ConfiguratorDiscountDataService } from '../services/configurator-discount-data.service';

@Injectable()
export class DiscountCodesListService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService, private configuratorDiscountDataService: ConfiguratorDiscountDataService) { }


  getDiscountList(projectCode): Observable<any> {
    // const getDiscountList = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_DISCOUNT_DISCOUNT_LIST'] + '/' + projectCode;
    // return this.http
    //   .get(getDiscountList)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getDiscountList = this.appConfigService.urlConstants['PLM_DISCOUNT_DISCOUNT_LIST']
    return this.http
      .get(getDiscountList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  submitDiscountForICOMSExtract(reqObj): Observable<any>{
    // const getOfferListForReleaseList = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_DISCOUNT_SEND_NOTIFICATION'];
    // return this.http
    //   .post(getOfferListForReleaseList, this.prepareSendNotificationData(reqObj))
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getOfferListForReleaseList = this.appConfigService.urlConstants['PLM_DISCOUNT_SEND_NOTIFICATION'];
    return this.http
      .get(getOfferListForReleaseList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private prepareSendNotificationData(reqObj) {
    return {
      'discountIds': reqObj
    };
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}

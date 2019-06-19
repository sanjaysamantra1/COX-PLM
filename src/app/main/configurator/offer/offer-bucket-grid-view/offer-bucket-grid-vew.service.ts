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
import { GetConfiguratorExistingPsu, GetConfiguratorExistingResponse } from './offer-bucket-grid-vew-interface';
import { ConfiguratorDataService } from '../../configurator-data.service';

@Injectable()
export class OfferBucketGridVewService {

  projectCode;
	
	constructor(private http: HttpClient, private appConfigService: AppConfigService, private configuratorDataService: ConfiguratorDataService ) { }
	
	getConfiguratorGridList(): Observable<any>{
    const getConfiguratorBoxViewList = this.appConfigService.urlConstants['PLM_CONFIGURATOR_PSU_OFFERLIST'];
    return this.http
      .get(getConfiguratorBoxViewList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  submitOfferForRelease(reqObj): Observable<any>{
    // const getOfferListForReleaseList = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_RELEASE_FOR_DISTRIBUTION'] +'/'+ this.configuratorDataService.configuratorProjectCode;
    // return this.http
    //   .post(getOfferListForReleaseList, reqObj)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getOfferListForReleaseList = this.appConfigService.urlConstants['PLM_CONFIGURATOR_OFFER_RELEASE_FOR_DISTRIBUTION'];
    return this.http
      .get(getOfferListForReleaseList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  testMethod(){}
  
}

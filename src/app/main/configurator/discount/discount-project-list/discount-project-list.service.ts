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
import { GetDiscountProjectList, GetDiscountProjectListResponse } from '../discount-project-list/discount-project-list';

@Injectable()
export class DiscountProjectListService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  getBreadCrumbs(): BreadCrumb[] {
    return [
      { 'name': 'Home', 'url': 'dashboard' },
      { 'name': 'User Admin', 'url': '' },
      { 'name': 'Search User', 'url': '' },
    ];
  }

  getDiscountProjectList(): Observable<any>{

    //  const getDiscountProjectListURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_DISCOUNT_PROJECT_DETAILS'];
    //   return this.http
    //     .get(getDiscountProjectListURL)
    //     .map((response: any) => {
    //       return response;
    //     })
    //     .catch(this.handleError);

    const getDiscountProjectList = this.appConfigService.urlConstants['PLM_DICOUNTS_PROJECT_LIST'];
    return this.http
      .get(getDiscountProjectList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}

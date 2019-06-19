import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfigService } from '../../../shared/services/app-config.service';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { IcomsInterface, DiscountIcomsModel, Users, IcomsStatusMasterData, IcomsUserFormData, ModifyIcomsUserRequest, ExportIcomsUserRequest } from '../icoms/icoms-interface';

@Injectable()
export class IcomsService {
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

  getFormData(): Observable<any>{
    const getUserDetailsURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_TECH_SYSTEM_MASTER_FORM_DATA'];
    return this.http
      .get(getUserDetailsURL)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
    // const getUserDetailsURL = this.appConfigService.urlConstants['PLM_TECH_SYSTEM_MASTER_FORM_DATA'];
    // return this.http
    //   .get(getUserDetailsURL)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }

  getIcomsTableList(): Observable<any> {
    const getIcomsTableLists = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_TECH_SYSTEM_ICOMS_LIST'];
    return this.http
        .get(getIcomsTableLists)
        .map((response: Response) => {
            return response;
        })
        .catch(this.handleError);
      // const getIcomsTableLists = this.appConfigService.urlConstants['PLM_TECH_SYSTEM_ICOMS_LIST'];
      // return this.http
      //     .get(getIcomsTableLists)
      //     .map((response: Response) => {
      //         return response;
      //     })
      //     .catch(this.handleError);
  }

  updateIcomsTableList(reqObjArray): Observable<any>{
  
  const updateIcomsTableLists = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_TECH_SYSTEM_UPDATE_ICOMS_LIST'];
  return this.http
    .put(updateIcomsTableLists, reqObjArray)
    .map((response: Response) => {
      return response;
    })
    .catch(this.handleError);

  //  const updateIcomsTableLists = this.appConfigService.urlConstants['PLM_TECH_SYSTEM_UPDATE_ICOMS_LIST'];
  //  return this.http
  //    .get(updateIcomsTableLists)
  //    .map((response: Response) => {
  //      return response;
  //    })
  //    .catch(this.handleError);
  }

  exportIcomsTableList(reqObj): Observable<any>{

    const exportIcomsTableLists = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_TECH_SYSTEM_EXPORT_ICOMS_LIST'];
  return this.http
    .post(exportIcomsTableLists, reqObj)
    .map((response: Response) => {
      return response;
    })
    .catch(this.handleError);
    // const exportIcomsTableLists = this.appConfigService.urlConstants['PLM_TECH_SYSTEM_EXPORT_ICOMS_LIST'];
    // return this.http
    //   .get(exportIcomsTableLists)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
   }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }

}

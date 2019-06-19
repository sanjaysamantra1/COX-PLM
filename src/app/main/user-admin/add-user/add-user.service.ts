import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { LDAPUserSearch, AddUserFormData, AddNewUserRequest, AddNewUserResponse } from './add-user.interface';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { AppConfigService } from '../../../shared/services/app-config.service';

@Injectable()
export class AddUserService {
  private breadCrumbs: BreadCrumb[];
  private searchCriteria: string[];
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {

  }

  getBreadCrumbs(): BreadCrumb[] {
    return [
      { 'name': 'Home', 'url': 'dashboard' },
      { 'name': 'User Admin', 'url': '' },
      { 'name': 'Add User', 'url': '' },
    ];
  }

  getFormData(): Observable<AddUserFormData>{
    // const getUserDetailsURL = this.appConfigService.protocol + '://' + this.appConfigService.host + ':' + this.appConfigService.port + '/' + this.appConfigService.urlConstants['PLM_ADD_USER_FORM_DATA'];
    const getUserDetailsURL = this.appConfigService.url +'/'+ this.appConfigService.urlConstants['PLM_ADD_USER_FORM_DATA'];
    //const getUserDetailsURL = this.appConfigService.urlConstants['PLM_ADD_USER_FORM_DATA'];
    return this.http
      .get(getUserDetailsURL)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getUserDetails(emailValue): Observable<LDAPUserSearch> {
     const getUserDetailsFromELDAP = this.appConfigService.url+ '/' + this.appConfigService.urlConstants['PLM_ADD_USER_SEARCH_USER_IN_ELDAP']+'/'+emailValue;
     return this.http
       .get(getUserDetailsFromELDAP)
       .map((response: Response) => {
         return response;
       })
       .catch(this.handleError);
//    const getUserDetailsURL = this.appConfigService.urlConstants['PLM_ADD_USER_SEARCH_USER_IN_ELDAP'];
//    return this.http
//      .get(getUserDetailsURL)
//      .map((response: Response) => {
//        return response;
//      })
//      .catch(this.handleError);
  }

  addNewUser(reqObj): Observable<AddNewUserResponse> {
     const addNewUserURL = this.appConfigService.url+ '/' + this.appConfigService.urlConstants['PLM_ADD_NEW_USER'];
     return this.http
       .post(addNewUserURL, reqObj)
       .map((response: Response) => {
         return response;
       })
       .catch(this.handleError);
//    const getUserDetailsURL = this.appConfigService.urlConstants['PLM_ADD_NEW_USER'];
//    return this.http
//      .get(getUserDetailsURL)
//      .map((response: Response) => {
//        return response;
//      })
//      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

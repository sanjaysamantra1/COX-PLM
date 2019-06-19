import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { AppConfigService } from '../../../shared/services/app-config.service';
import { SearchUserResponse, SearchUserRequest, ModifyUserRequest } from './search-user.interface';

@Injectable()
export class SearchUserService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  getBreadCrumbs(): BreadCrumb[] {
    return [
      { 'name': 'Home', 'url': 'dashboard' },
      { 'name': 'User Admin', 'url': '' },
      { 'name': 'Search User', 'url': '' },
    ];
  }

  getUserList(searchCriteria:SearchUserRequest ): Observable<SearchUserResponse>{
    //  const getUserList = this.appConfigService.url+ '/' + this.appConfigService.urlConstants['PLM_SEARCH_USER_SEARCH'];
    // const paramsVal = new HttpParams()
    //   .append('searchCriteria', searchCriteria.searchCriteria)
    //   .append('searchType', searchCriteria.searchType);
       
    //  return this.http
    //    .post(getUserList, searchCriteria)
    //    .map((response: Response) => {
    //      return response;
    //    })
    //    .catch(this.handleError);
   const getUserList = this.appConfigService.urlConstants['PLM_SEARCH_USER_SEARCH'];
   return this.http
     .get(getUserList)
     .map((response: Response) => {
       return response;
     })
     .catch(this.handleError);
  }

  updateUsers(userList:ModifyUserRequest ): Observable<SearchUserResponse>{
    //  const updateUsers = this.appConfigService.url +'/'+ this.appConfigService.urlConstants['PLM_UPDATE_USER'];
    //  return this.http
    //    .put(updateUsers, userList)
    //    .map((response: Response) => {
    //      return response;
    //    })
    //    .catch(this.handleError);
   const updateUsers = this.appConfigService.urlConstants['PLM_UPDATE_USER'];
   return this.http
     .get(updateUsers)
     .map((response: Response) => {
       return response;
     })
     .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}

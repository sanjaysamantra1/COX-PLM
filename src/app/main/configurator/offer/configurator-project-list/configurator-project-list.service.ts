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
import { GetConfiguratorProjectList, GetConfiguratorProjectListResponse } from './configurator-project-list-interface';
import { Project } from '../../configurator.interface';

@Injectable()
export class ConfiguratorProjectListService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  getBreadCrumbs(): BreadCrumb[] {
    return [
      { 'name': 'Home', 'url': 'dashboard' },
      { 'name': 'User Admin', 'url': '' },
      { 'name': 'Search User', 'url': '' },
    ];
  }

  getConfiguratorProjectList(): Observable<Project[]> {
    // const getConfiguratorProjectListURL = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_CONFIGURATOR_PROJECT_LIST'];
    // return this.http
    //   .get(getConfiguratorProjectListURL)
    //   .map((response: any) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
    const getConfiguratorProjectList = this.appConfigService.urlConstants['PLM_CONFIGURATOR_PROJECT_LIST'];
    return this.http
      .get(getConfiguratorProjectList)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }



}

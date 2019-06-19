import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfigService } from '../shared/services/app-config.service'
import { LoginInterface } from '../login/login-interface';

@Injectable()
export class LoginServiceService {

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  login(reqObj): Observable<any> {
      // const getLoginResponse = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_LOGIN_RESPONSE'];
      //  const email: string = reqObj.userName;
      //  const password: string = reqObj.password;
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Authorization', +'Basic ' + btoa(email + ':' + password)); 
      // headers.append('Content-Type', 'application/json');
      //  return this.http
      //      .post(getLoginResponse, {}, {
      //        headers: new HttpHeaders({
      //           'Authorization' : 'Basic ' + btoa(email + ':' + password),
      //           'Content-Type' : 'application/json'
      //        })
      //      })
      //      .map((response: Response) => {
      //        return response;
      //      })
      //     .catch(this.handleError);
    const getLoginResponse = this.appConfigService.urlConstants['PLM_LOGIN_RESPONSE']
    return this.http
      .get(getLoginResponse)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }


  logout(): Observable<any> {
    const getLogoutRequest = this.appConfigService.url + '/' + this.appConfigService.urlConstants['PLM_Logout'];
    return this.http
        .get(getLogoutRequest)
        .map((response: Response) => {
          return response;
        })
        .catch(this.handleError);
  }

   private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}

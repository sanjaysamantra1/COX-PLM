import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; 

@Injectable()
export class HttpUtilityService {

  constructor(private _http: HttpClient) { }
  
  getHTTPGET(url:any, data:any, config:any): Observable<any> {
      return this._http.get(url, data)
        .map((res) => {
          return res;
        })
        .retry(3)
        .catch((err) => {
            return Observable.of(err);
        });
  }
   
  getHTTPPOST(url:any, data:any, config:any): Observable<any> {
      return this._http.post(url, data, config)
        .map((res) => {
          return res;
        })
        .retry(3)
        .catch((err) => {
            return Observable.of(err);
        });
  }
    
  getHTTPPUT(url:any, data:any, config:any): Observable<any> {
      return this._http.put(url, data, config)
        .map((res) => {
          return res;
        })
        .retry(3)
        .catch((err) => {
            return Observable.of(err);
        });
  }
}

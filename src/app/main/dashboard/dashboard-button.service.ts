import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardButtonService {
    jsonUrl = 'data/roleData.json';
    constructor(private http: HttpClient) {}

    getRoleJSONData(): Observable<any> {
        return this.http.get(this.jsonUrl, { responseType: 'json' });
    }
}

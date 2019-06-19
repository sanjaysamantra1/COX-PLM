import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthGuardDataService } from './shared/guard/auth-guard-data.service';

@Component({
    selector: 'plm-root',
    templateUrl: './plm.component.html'
})
export class PLMComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    
    constructor(
        private http: HttpClient,
        
        private authGuardDataService: AuthGuardDataService
    ) {
    }

    ngOnInit() {
    }
}

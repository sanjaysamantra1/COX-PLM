import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         let authReq: HttpRequest<any>;
         if (sessionStorage.getItem('isLoggedIn') == 'true') {
           let plmSessionKeyVal = sessionStorage.getItem('sessionKey');
           let userIdVal = sessionStorage.getItem('userId').toString();
           let newHttpHeaders = new HttpHeaders({
                'plmSessionKey': plmSessionKeyVal+ 'UID' +userIdVal
              });
           authReq = req.clone({ 
            headers: newHttpHeaders
            });
         } else {
           authReq = req;
         }
        // Clone the request to add the new header.
        //send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                if ((error instanceof HttpErrorResponse) && (((<HttpErrorResponse>error).status == 500) || ((<HttpErrorResponse>error).status == 777))) {
                    sessionStorage.removeItem('isLoggedIn');
                    sessionStorage.removeItem('sessionKey');
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('roleName');
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('workGroups');
                    this.router.navigate(['/login']);
                } else {
                    return Observable.throw(error);
                }
            }) as any;
    }
}
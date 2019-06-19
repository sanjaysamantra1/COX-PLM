import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authGuardService: AuthGuardService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let path = next.data['path'] as string;
    return this.authGuardService.checkForAuthentication(path);
  }
}

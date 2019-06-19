import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthGuardDataService } from './auth-guard-data.service';
import { RoleMatrix } from '../config/role-matrix';

@Injectable()
export class AuthGuardService {
  private rolesMatrix: any;
  private currentRolesMatrix: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authGuardDataService: AuthGuardDataService
  ) { }

  checkForAuthentication(authRoute) {
    let result = false;
    if ((this.isLoggedIn()) && (this.isValidSession())) {
      this.rolesMatrix = RoleMatrix.roleMatrix;
      result = this.checkIsAuthenticatedForPage(authRoute);
      return result;
    } else {
      this.redirectToLoginPage();
      return false;
    }
  }

  checkIsAuthenticatedForPage(authRoute) {
    if (typeof this.currentRolesMatrix !== 'undefined') {
      if (this.currentRolesMatrix[authRoute]) {
        return true;
      } else {
        this.redirectToAuthenticatedPage();
        return false;
      }
    } else {
      return this.getCurrentRoleMatrix(authRoute);
    }
  }

  getCurrentRoleMatrix(authRoute) {
    let result: object, loggedUserWorkGroupsArray: any[], isAuthenticated: boolean;
    loggedUserWorkGroupsArray = [];
    const loggedUserWorkGroups = sessionStorage.getItem('workGroups');
    loggedUserWorkGroupsArray = loggedUserWorkGroups.split(',');
    if (loggedUserWorkGroupsArray.length > 0) {
      result = this.getIntialRoleMatrix(loggedUserWorkGroupsArray);      
    } else {
      result = this.rolesMatrix[loggedUserWorkGroupsArray[0]];
    }
    this.currentRolesMatrix = JSON.parse(JSON.stringify(result));
    if (this.currentRolesMatrix[authRoute]) {
      return true;
    } else {
      this.redirectToAuthenticatedPage();
      return false;
    }
  }

  getIntialRoleMatrix(loggedUserWorkGroupsArray) {
    let result: object;
    this.rolesMatrix = RoleMatrix.roleMatrix;
    const roleMatrixKeys = Object.keys(this.rolesMatrix['Administrator']);
    result = {};
    for (let i=0; i< roleMatrixKeys.length; i++) {
      result[roleMatrixKeys[i]] = this.getFinalRoleMatrixObject(loggedUserWorkGroupsArray,roleMatrixKeys[i]);
    }
    return result;
  }

  getFinalRoleMatrixObject(loggedUserWorkGroupsArray, roleMatrixKey) {
    let result = false;
    for (let i=0; i< loggedUserWorkGroupsArray.length; i++) {
        if (this.rolesMatrix[loggedUserWorkGroupsArray[i]][roleMatrixKey]) {
          result = true;
          break;
        }
    }
    return result;
  }

  isLoggedIn() {
    if (sessionStorage.getItem('isLoggedIn')  ===  'true') {
      return true;
    } else {
      return false;
    }
  }

  isValidSession() {
    if (typeof sessionStorage.getItem('sessionKey') !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  redirectToAuthenticatedPage() {
    const workGroups = sessionStorage.getItem('workGroups').split(',');
    if (workGroups.length > 0) {
      this.router.navigate(['']);
    } else if (workGroups[0] === 'requestor') {
      this.router.navigate(['plm-work-flow/requestor/intake-request-list']);
    } else if (workGroups[0] === 'configurator') {
      this.router.navigate(['plm-work-flow/configurator/offer/project-list']);
    }
  }

  redirectToLoginPage(){
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('sessionKey');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('roleName');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('workGroups');
    this.router.navigate(['/login']);
  }

}

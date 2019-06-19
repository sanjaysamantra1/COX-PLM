import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Component, ViewChild, OnInit, Output, Input, Inject } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { LoginInterface } from '../login/login-interface';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomValidators } from './validators/custom-validator.directive';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'plm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  providers: [LoginServiceService, UtilitiesService]
})
export class LoginComponent implements OnInit {
  private validateForm: FormGroup;
  private loginResponse: LoginInterface;
  private loginFail: Boolean;
  private inValidCredentials: string;
  private emailPattern: string;

  constructor(private loginService: LoginServiceService, private _router: Router, private form: FormBuilder, public dialog: MatDialog, private utilitiesService: UtilitiesService) {
    sessionStorage.clear();
    this.validateForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });
    this.loginFail = false;
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('sessionKey', '');
    sessionStorage.setItem('roleName', '');
    sessionStorage.setItem('userId', '');
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('workGroups', '');
    this.inValidCredentials = 'Invalid User!';
    this.emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-za-z]{2,4}$"; 
  }

  ngOnInit() { }

  getLoginResponseData(validateForm: NgForm) {
    this.loginFail = false;
    const reqObj = {
      'userName': validateForm.value.email,
      'password': validateForm.value.password
    };
    this.loginService.login(reqObj)
      .subscribe(
        data => {
          if (data.actionStatus === 'SUCCESS') {
            this.loginFail = false;
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('sessionKey', data.plmSessionKey);
            sessionStorage.setItem('userId', data.plmUserModel.userId);
            sessionStorage.setItem('roleName', data.plmUserModel.userRoleModelLst[0].roleName);
            sessionStorage.setItem('userName',  data.plmUserModel.firstname+' '+data.plmUserModel.lastName);
            sessionStorage.setItem('workGroups', this.getWorkGroups(data.plmUserModel.plmWorkGroupModelLst));
            this._router.navigate(['']);
          } else if (data.actionStatus === 'FAIL') {
            this.inValidCredentials = this.utilitiesService.getServerMessage(data,this.inValidCredentials);   
            this.loginFail = true;                 
            return false;
          }
        },
        error => {
          console.log("Error :: " + error);
          this.loginFail = true;                 
          return false;
        }
      );
  }

  getWorkGroups(workGroups) {
    let result = '';
    if ((typeof workGroups != 'undefined') && (workGroups.length > 0)) {
      for (let i=0; i<workGroups.length; i++) {
        result += ((workGroups.length > 1) && ((i+1) !== parseInt(workGroups.length))) ? (workGroups[i].workGroupName+',') : workGroups[i].workGroupName;
      }
    }
    return result;
  }

}

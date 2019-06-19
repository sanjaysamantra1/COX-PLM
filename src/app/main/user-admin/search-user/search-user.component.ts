import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SearchUserService } from './search-user.service';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { SearchUserRequest } from './search-user.interface';
import { SearchUserCriteriaComponent } from './search-user-criteria/search-user-criteria.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchUserModel, SearchUserResponse } from './search-user.interface';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
    selector: 'plm-search-user',
    templateUrl: './search-user.component.html',
    providers: [SearchUserService, UtilitiesService]
})
export class SearchUserComponent implements OnInit {
    private breadCrumbs: BreadCrumb[];
    private searchInFilter: string[];
    private formDataAvailable: boolean;
    private statusUpdated: boolean;
    private invalidEmail: boolean;
    private noUserFound: boolean;
    private searchUserCriteria: SearchUserRequest;
    private userList: SearchUserResponse;
    private searchData: SearchUserResponse;
    private noSearchInCriteria: Boolean;

    constructor(private searchUserService:SearchUserService, private utilitiesService: UtilitiesService){
        this.formDataAvailable = false;
        this.statusUpdated = false;
        this.breadCrumbs = this.searchUserService.getBreadCrumbs();
        this.searchInFilter = ['EMAIL', 'FIRSTNAME', 'LASTNAME'];
        this.formDataAvailable = true;
         this.invalidEmail = false;
         this.noUserFound = false;
        this.noSearchInCriteria = false;
    }
    
    ngOnInit() {
    }
  
    onsearchUser(searchCriteria: SearchUserRequest){
        this.invalidEmail = false;
        this.noUserFound = false;
        this.noSearchInCriteria = false;
        if ((searchCriteria.searchType === 'EMAIL') && (!this.utilitiesService.isEmailAddress(searchCriteria.searchCriteria))){
            setTimeout(() => {
                this.invalidEmail = true;
            }, 0);
            this.userList = {
                'actionResult': null,
                'actionStatus': null,
                'searchUserModel': null,
                'users': []
            }
            return false;
        } else if ((searchCriteria.searchCriteria !== '') && (searchCriteria.searchType === '')) {
            setTimeout(() => {
                this.noSearchInCriteria = true;
            }, 0);
            this.userList = {
                'actionResult': null,
                'actionStatus': null,
                'searchUserModel': null,
                'users': []
            }
            return false;
        }
        this.searchUserService.getUserList(searchCriteria)
            .subscribe(
                data => {
                    if (data.actionStatus == 'SUCCESS') {
                        this.userList = data;
                        this.searchData = data;
                        this.formDataAvailable = true;
                    } else if (data.actionStatus == 'FAIL') {
                        const intialObj =  {
                            'actionResult': null,
                            'actionStatus': null,
                            'searchUserModel': null,
                            'users': []
                        }
                        this.userList = intialObj;
                        this.searchData = intialObj;
                        this.formDataAvailable = true;
                    } 
                },
                error => {
                    console.log("Error :: " + error)
                }
            );
    }

    hideStatus(){
        this.statusUpdated = false;
        this.noSearchInCriteria = false;
        this.invalidEmail = false;
        this.noUserFound = false;
    }

    onStatusUpdate(statusUpdated: boolean): void{
       if (statusUpdated) {
           this.statusUpdated = true;
           setTimeout(function() {
                this.hideStatus();
            }.bind(this), 5000);
           const reqObj = {
                'searchCriteria': '',
                'searchType': ''
            }
           this.onsearchUser(reqObj);
       } else {
           this.statusUpdated = false;
       }
    }
}
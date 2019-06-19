import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AddUserService } from './add-user.service';
import { LDAPUserSearch, AddUserFormData, AddNewUserRequest, AddNewUserResponse } from './add-user.interface';
import { BreadCrumb } from '../../../shared/services/bread-crumb';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
    selector: 'plm-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [AddUserService, UtilitiesService]
})
export class AddUserComponent implements OnInit {

    @ViewChild('addUserForm') public addUserForm: NgForm;
    private dropdownList = [];
    private selectedItems = [];
    private dropdownSettings = {};
    private breadCrumbs: BreadCrumb[];
    private newUserAdded: boolean;
    private newUserNotAdded: boolean;
    private invalidEmail: boolean;
    private emailNotExists: boolean;
    private usersData: AddUserFormData;
    private email: string;
    private fname: string;
    private lname: string;
    private formDataAvailable: boolean;
    private userAddedSuccessfully: string;
    private userAddedFailed: string;
    private invalidEmailError: string;
    private invalidUserError: string;

    constructor(private addUserService: AddUserService, private utilitiesService: UtilitiesService) {
        this.newUserAdded = false;
        this.newUserNotAdded = false;
        this.invalidEmail = false;
        this.emailNotExists = false;
        this.formDataAvailable = false;
        this.breadCrumbs = this.addUserService.getBreadCrumbs();
        this.userAddedSuccessfully = 'New User Successfully Added';
        this.userAddedFailed = 'User already exist in PLM. Please check User Active Status.';
        this.invalidEmailError = 'Please put correct Cox email ID.';
        this.invalidUserError = 'Please put correct Cox email ID.';
        this.getFormData();
    }

    getFormData() {
        this.addUserService.getFormData()
            .subscribe(
                data => {
                    this.usersData = data;
                    this.populateData(data);
                    this.formDataAvailable = true;
                },
                error => {
                    console.log("Error :: " + error)
                }
            );
    }

    populateData(data) {
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Work Group",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class",
            badgeShowLimit: 3,
            maxHeight: 120
        };
        for (const workGroupModel of data.workGroupModels) {
            this.dropdownList.push({
                "id": workGroupModel.workGroupId,
                "itemName": workGroupModel.workGroupName,
            })
        }
    }

    getUsersDetails() {
        this.emailNotExists = false;
        this.invalidEmail = false;
        const emailValue = this.addUserForm.value.email;
        if (!this.utilitiesService.isEmailAddress(emailValue)){
            this.invalidEmail = true;
            return false;
        }
        this.invalidUserError = 'Please put correct Cox email ID.';
        this.addUserService.getUserDetails(emailValue)
            .subscribe(
                data => {
                    if (Object.keys(data).length === 0 ) {
                        this.emailNotExists = true;
                        this.invalidUserError = this.utilitiesService.getServerMessage(data, this.invalidUserError);
                    } else {
                        this.email = data.email;
                        this.fname = data.givenName;
                        this.lname = data.displayName;
                    }
                },
                error => {
                    console.log("Error :: " + error)
                }
            );
    }

    addNewUser(){
        this.newUserAdded = false;
        this.newUserNotAdded = false;
        const workGroupIDs: number[] = [];
        for (let i=0; i<this.selectedItems.length; i++) {
            workGroupIDs.push(Number(this.selectedItems[i].id));
        }
        
        let reqObj: AddNewUserRequest;
        reqObj = {
            "email" : this.addUserForm.value.email,
            "roleId": Number(this.addUserForm.value.rolesDropdown), 
            "firstName": this.fname,
            "lastName": this.lname,
            "statusId": Number(this.addUserForm.value.statusDropDown),
            "workGroupId": workGroupIDs,
            "defaultWorkGroup": [Number(this.addUserForm.value.workGroupDropDown)],
            "createdBy": sessionStorage.getItem('userName')
        };
        this.userAddedSuccessfully ='New User Successfully Added';
        this.userAddedFailed = 'User already exist in PLM. Please check User Active Status.';
        this.addUserService.addNewUser(reqObj)
            .subscribe(
                data => {
                    if (data.actionStatus == "SUCCESS") {
                        this.newUserAdded = true;
                        this.userAddedSuccessfully = this.utilitiesService.getServerMessage(data,this.userAddedSuccessfully);
                    } else {
                        this.newUserNotAdded = true;
                        this.userAddedFailed = this.utilitiesService.getServerMessage(data, this.userAddedFailed);
                    }
                },
                error => {
                    console.log("Error :: " + error)
                }
            );
    }
      
    ngOnInit() {

    }
    onItemSelect(item: any) {
    }
    OnItemDeSelect(item: any) {
    }
    onSelectAll(items: any) {
    }
    onDeSelectAll(items: any) {
    }
}

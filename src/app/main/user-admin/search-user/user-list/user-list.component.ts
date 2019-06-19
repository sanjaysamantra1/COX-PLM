import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AddUserService } from '../../add-user/add-user.service';
import { LDAPUserSearch, AddUserFormData, AddNewUserRequest, AddNewUserResponse } from '../../add-user/add-user.interface';
import { SearchUserService } from '../search-user.service';
import { SearchUserModel, Users, ModifyUserRequest, ModifyUser, SelectedWorkGroup, StatusMasterData, RolesMasterData, WorkGroupMasterData } from '../search-user.interface';


@Component({
  selector: 'plm-user-list',
  templateUrl: './user-list.component.html',
  providers: [AddUserService]
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() userList: SearchUserModel[];
  @Output() statusUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  private users: string;
  private filterByName: string;
  private filterByEmail: string;
  private filterByStatus: string;
  private filterByRole: string;
  private filterByWorkGroup: string;
  private filterBylastLogon: string;
  private filterByNameSearchObj: any;
  private filterByEmailSearchObj: any;
  private filterByStatusSearchObj: any;
  private filterByRoleSearchObj: any;
  private filterByWorkGroupSearchObj: any;
  private filterBylastLogonSearchObj: any;
  private showSearch: boolean;
  private updateUsersChecked: boolean;
  private statusMasterData: StatusMasterData[];
  private rolesMasterData: RolesMasterData[];
  private workGroupMasterData: WorkGroupMasterData[];
  private dropdownList = [];
  private dropdownSelectList = [];
  private selectedItems = [];
  private dropdownSettings = {};
  private workGroupDropdownSettings = {};
  private usersData: AddUserFormData;
  private key: string;
  private reverse: boolean;
  private usersExist: Boolean;
  private searchSelectedWorkGroup: any;

  constructor(private addUserService: AddUserService, private searchUserService: SearchUserService) {
    this.getFormData();
    this.filterByName = '';
    this.filterByEmail = '';
    this.filterByStatus = '';
    this.filterByRole = '';
    this.filterByWorkGroup = '';
    this.filterBylastLogon = '';
    this.filterByNameSearchObj = '';
    this.filterByEmailSearchObj = '';
    this.filterByStatusSearchObj = '';
    this.filterByRoleSearchObj = '';
    this.filterByWorkGroupSearchObj = '';
    this.filterBylastLogonSearchObj = '';
    this.key = 'name';
    this.reverse = false;
    this.updateUsersChecked = true;
    this.usersExist = false;
    this.searchSelectedWorkGroup = [];
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const userList: SimpleChange = changes.userList;
    this.userList = ((typeof userList.currentValue != 'undefined') && ((typeof userList.currentValue.users != 'undefined'))) ? JSON.parse(JSON.stringify(userList.currentValue.users)) : [];
    if (this.userList.length > 0) {
      this.usersExist = true;
    } else {
      this.usersExist = false;
    }
    if (typeof this.usersData !== 'undefined' ) {
      this.modifyUserListObject();
    }
  }

  getStatusName(statusID) {
    let result = '';
    for (let i=0; i<this.statusMasterData.length; i++) {
      if (this.statusMasterData[i].statusId == statusID) {
        result = this.statusMasterData[i].statusName;
      }
    }
    return result;
  }

  getRoleName(roleID) {
    let result = '';
    for (let i=0; i<this.rolesMasterData.length; i++) {
      if (this.rolesMasterData[i].roleId == roleID) {
        result = this.rolesMasterData[i].roleName;
      }
    }
    return result;
  }

  modifyUserListObject() {
    if (this.userList.length > 0) {
      for (let i = 0; i < this.userList.length; i++) {
        this.userList[i].checked = false;
        this.userList[i].selected = this.userList[i].statusId;
        this.userList[i].name = this.userList[i].firstname + ' ' + this.userList[i].lastname;
        this.userList[i].status = this.getStatusName(this.userList[i].statusId);
        this.userList[i].statusArray = this.statusMasterData;

        this.userList[i].selectedRole = this.userList[i].roleId;
        this.userList[i].role = this.getRoleName(this.userList[i].roleId);
        this.userList[i].roleArray = this.rolesMasterData;

        this.userList[i].selectedWorkGroup = this.getSelectedWorkGroupItems(this.userList[i].workGroupIds);
        this.userList[i].selectedWorkGroupIDs = [];
        for (const selectedWorkGroup of this.userList[i].selectedWorkGroup) {
          this.userList[i].selectedWorkGroupIDs.push(Number(selectedWorkGroup.id))
        }
        this.userList[i].createdBy = this.userList[i].createdBy;
        this.userList[i].createdDate = this.userList[i].createdDate;
        this.userList[i].firstname = this.userList[i].firstname;
        this.userList[i].lastLoginInfo = this.userList[i].lastLoginInfo;
        this.userList[i].lastLogon = this.userList[i].lastLogon;
        this.userList[i].lastname = this.userList[i].lastname;
        this.userList[i].logonId = this.userList[i].logonId
        this.userList[i].modifiedBy = this.userList[i].modifiedBy;
        this.userList[i].modifiedDate = this.userList[i].modifiedDate;
        this.userList[i].roleId = this.userList[i].roleId;
        this.userList[i].statusId = this.userList[i].statusId;
        this.userList[i].userId = this.userList[i].userId;
        this.userList[i].workGroupIds = this.userList[i].workGroupIds;
        this.updateWorkGroupDropDownSetting(i);
      }
    }
    this.users = JSON.stringify(this.userList);
    this.initializeFilterContext();
  }

  getSelectedWorkGroupItems(workGroupID): SelectedWorkGroup[] {
    let result: SelectedWorkGroup[] = [];
    if (workGroupID && (typeof workGroupID != 'undefined') && (workGroupID.length > 0)) {
      for (let i=0; i<this.workGroupMasterData.length; i++) {
        if (workGroupID.indexOf(Number(this.workGroupMasterData[i].workGroupId)) > -1) {
          result.push({
            "id": this.workGroupMasterData[i].workGroupId,
            "itemName": this.workGroupMasterData[i].workGroupName,
          })
        }
      }
    }
    return result;
  }

  getSelectedItemsObject(masterData, dropDownList) {
    let result = [];
    for (let i = 0; i < masterData.length; i++) {
      if ((dropDownList instanceof Array) && (dropDownList.indexOf(masterData[i]['intakeFormDrpdwnDetailId']) > -1)) {
        result.push({
          "id": masterData[i]['intakeFormDrpdwnDetailId'],
          "itemName": masterData[i]['objectName']
        });
      } else if (masterData[i]['intakeFormDrpdwnDetailId'] == dropDownList) {
        result.push({
          "id": masterData[i]['intakeFormDrpdwnDetailId'],
          "itemName": masterData[i]['objectName']
        });
      }
    }
    return result;
  }

  initializeFilterContext() {
    this.filterByNameSearchObj = {
      'name': {
        'type': 'text',
        'value': this.filterByName,
        'matchFullCase': false
      }
    };
    this.filterByEmailSearchObj = {
      'logonId': {
        'type': 'text',
        'value': this.filterByEmail,
        'matchFullCase': false
      }
    };
    this.filterByStatusSearchObj = {
      'status': {
        'type': 'text',
        'value': this.filterByStatus,
        'matchFullCase': true
      }
    };
    this.filterByRoleSearchObj = {
      'role': {
        'type': 'text',
        'value': this.filterByRole,
        'matchFullCase': true
      }
    };
    this.filterByWorkGroupSearchObj = {
      'selectedWorkGroup': {
        'type': 'multiSelect',
        'value': this.filterByWorkGroup,
        'matchFullCase': false
      }
    };
    this.filterBylastLogonSearchObj = {
      'lastLogon': {
        'type': 'date',
        'value': this.filterBylastLogon,
        'matchFullCase': true
      }
    };
  }

  updateFilterContext(obj,key, newVal) {
    this[obj][key]['value'] = newVal;
  }

  getFormData() {
    this.addUserService.getFormData()
      .subscribe(
      data => {
        this.usersData = data;
        this.populateData(data);
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
    this.statusMasterData = data.userStatus;
    this.rolesMasterData = data.userRoles;
    this.workGroupMasterData = data.workGroupModels;

    for (const workGroupModel of this.workGroupMasterData) {
      this.dropdownList.push({
        "id": workGroupModel.workGroupId,
        "itemName": workGroupModel.workGroupName,
      })
    }
    this.modifyUserListObject();
  }

  updateWorkGroupDropDownSetting(index) {
    if (this.userList[index].statusId == 2) {
      this.userList[index].workGroupDropdownSettings = {
        singleSelection: false,
        text: "Select Work Group",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class",
        badgeShowLimit: 3,
        maxHeight: 120,
        disabled: true
      };
    } else {
      this.userList[index].workGroupDropdownSettings = {};
      this.userList[index].workGroupDropdownSettings = {
        singleSelection: false,
        text: "Select Work Group",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: "myclass custom-class",
        badgeShowLimit: 3,
        maxHeight: 120
      };
    }
  }

  getIndexByUserID(userId) {
    let result = 0;
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].userId === userId) {
        result = i;
        break;
      }
    }
    return result;
  }

  modifyUserData(userId, statusId) {
    let index = this.getIndexByUserID(userId);
    this.userList[index].statusId = statusId;

    for (const statusObj of this.userList[index].statusArray) {
      if ((typeof statusObj !== 'undefined') && (Number(this.userList[index].selected) === Number(statusObj.statusId))) {
        this.userList[index].statusName = statusObj.statusName;
      }
    }
    this.updateWorkGroupDropDownSetting(index);
  }

  modifyUserRoleData(userId, roleId) {
    let index = this.getIndexByUserID(userId);
    this.userList[index].roleId = roleId;
    for (const roleObj of this.userList[index].roleArray) {
      if ((typeof roleObj !== 'undefined') && (Number(this.userList[index].selectedRole) === Number(roleObj.roleId))) {
        this.userList[index].roleName = roleObj.roleName;
      }
    }
  }
  modifyUserWorkGroupData(userId, workGroups) {
    let index = this.getIndexByUserID(userId);
    this.userList[index].selectedWorkGroup = workGroups;
    this.userList[index].workGroupIDArray = [];
    this.userList[index].selectedWorkGroupIDs = [];
    for (const selectedWorkGroup of workGroups) {
      this.userList[index].workGroupIDArray.push({
          'workGroupId': Number(selectedWorkGroup.id),
          'workGroupName': selectedWorkGroup.itemName
      });
      this.userList[index].selectedWorkGroupIDs.push(Number(selectedWorkGroup.id))
    }
  }
  modifyUserDefaultGroupData(index) {
    this.userList[index].defaultworkgroupid.defaultWorkGroupId = this.userList[index].selectedDefaultWorkGroup;
    for (const defaultWorkGroupObj of this.userList[index].defaultWorkGroupIDArray) {
      if ((typeof defaultWorkGroupObj !== 'undefined') && (Number(this.userList[index].selectedDefaultWorkGroup) === Number(defaultWorkGroupObj.defaultWorkGroupId))) {
        this.userList[index].defaultworkgroupid.defaultWorkGroupName = defaultWorkGroupObj.defaultWorkGroupName;
      }
    }
  }

  updateUsersData() {
    const reqObjArray: ModifyUserRequest = {
      "users": []
    };
    let count = 0;
    if (this.userList.length > 0) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].checked) {
          count++;
          let reqObj: Users = {
            createdBy : this.userList[i].createdBy,
            createdDate : this.userList[i].createdDate,
            firstname : this.userList[i].firstname,
            lastLoginInfo : this.userList[i].lastLoginInfo,
            lastLogon : this.userList[i].lastLogon,
            lastname : this.userList[i].lastname,
            logonId : this.userList[i].logonId,
            modifiedBy : this.userList[i].modifiedBy,
            modifiedDate : this.userList[i].modifiedDate,
            roleId : Number(this.userList[i].roleId),
            statusId : Number(this.userList[i].statusId),
            userId : this.userList[i].userId,
            workGroupIds : this.userList[i].selectedWorkGroupIDs
          };
          
          reqObjArray.users.push(reqObj);
        }
      }
    }
    if (count > 0) {
      this.searchUserService.updateUsers(reqObjArray)
        .subscribe(
        data => {
          if (data.actionStatus === "SUCCESS") {
            this.statusUpdated.emit(true);
          } else {
            this.statusUpdated.emit(false);
          }
        },
        error => {
          console.log("Error :: " + error)
        }
        );
    }
  }
  

  enableDisableUpdateButton() {
    let count = 0;
    if (this.userList.length > 0) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].checked) {
          count++;
        }
      }
    }
    if (count > 0) {
      this.updateUsersChecked = false;
    } else {
      this.updateUsersChecked = true;
    }
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onItemSelect(item: any, index: number, modelVal: any ) {
    this.getWorkGroupIDS(item, index, modelVal);
  }
  OnItemDeSelect(item: any, index: number, modelVal: any ) {
    this.getWorkGroupIDS(item, index, modelVal); 
  }
  onSelectAll(items: any, index: number, modelVal: any ) {
    this.getWorkGroupIDS(items, index, modelVal); 
  }
  onDeSelectAll(items: any, index: number, modelVal: any ) {
    this.getWorkGroupIDS(items, index, modelVal); 
  }

  onSearchItemSelect(item: any, modelVal: any ) {
    // this.getWorkGroupIDS(item, index, modelVal);
  }
  OnSearchItemDeSelect(item: any, modelVal: any ) {
    // this.getWorkGroupIDS(item, index, modelVal); 
  }
  onSearchSelectAll(items: any, modelVal: any ) {
    // this.getWorkGroupIDS(items, index, modelVal); 
  }
  onSearchDeSelectAll(items: any, modelVal: any ) {
    // this.getWorkGroupIDS(items, index, modelVal); 
  }
  
  getWorkGroupIDS(items, index, modelVal) {
    this.userList[index].workGroupIds = [];
    for (let i=0; i<modelVal.length; i++) {
      this.userList[index].workGroupIds.push(parseInt(modelVal[i].id));
    }
  } 

  disableMultiSelect(statusId) {
    alert(statusId);
    if (statusId == 2) {
      return false;
    }
    return true;
  }

}
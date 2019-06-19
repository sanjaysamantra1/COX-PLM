import { interceptingHandler } from "@angular/common/http/src/module";

export interface SearchUserRequest {
    searchCriteria: string;
    searchType: string;
}

export interface SearchUserModel {
    userid: string;
    firstname: string;
    lastname: string;
    email: string;
    lastLogon: string;
    statusId: number;
    statusName: string;
    statusArray: StatusID[];
    checked: boolean;
    selected: number;
    selectedRole: number;
    selectedWorkGroup: SelectedWorkGroup[];
    selectedDefaultWorkGroup: number;
    name: string;
    status: string;
    roleid: RoleID;
    roleId: number;
    workGroupIds: number[];
    roleArray: RoleID[];
    role: string;
    workgroupid: WorkGroupID;
    workGroupIDArray: WorkGroupID[];
    workgroupId: string;
    workGroupIDArraySelected: WorkGroupID[];
    defaultworkgroupid: DefaultWorkGroupID;
    defaultWorkGroupIDArray: DefaultWorkGroupID[];
    defaultWorkGroupId: string;
    selectedWorkGroupIDs : number[],
    createdBy: string;
    createdDate: string;
    lastLoginInfo: any;
    logonId: string;
    modifiedBy: string;
    modifiedDate: string;
    userId: number;
    roleName: string;
    workGroupDropdownSettings: any;
}

export interface Users {
    createdBy: string;
    createdDate: string;
    firstname: string;
    lastLoginInfo: any;
    lastLogon: string;
    lastname: string;
    logonId: string;
    modifiedBy: string;
    modifiedDate: string;
    roleId: number;
    statusId: number;
    userId: number;
    workGroupIds: number[];
}

export interface SelectedWorkGroup {
    id: number;
    itemName: string;
}

export interface StatusID {
    statusId: number;
    statusName: string;
}

export interface WorkGroupID {
    workGroupId: number;
    workGroupName: string;
}

export interface DefaultWorkGroupID {
    defaultWorkGroupId: number;
    defaultWorkGroupName: string;
}

export interface RoleID {
    roleId: number;
    roleName: string;
}

export interface SearchUserResponse {
    actionResult: string;
    actionStatus: string;
    searchUserModel: SearchUserModel[];
    users: Users[];
}

export interface ModifyUser {
    userid: string;
    statusid: number;
    roleid: number;
    firstname: string;
    lastname: string;
    email: string;
    workgroupid: number[];
    lastLogon: string;
}

export interface ModifyUserRequest {
    users: Users[];
}

export interface ModifyUserResponse {
    actionResult: string;
    actionStatus: string;
    searchUserModel: SearchUserModel[];
}

/* Matser data */
export interface UserListMasterData {
    statusMasterData: StatusMasterData[];
    rolesMasterData: RolesMasterData[];
    workGroupMasterData: WorkGroupMasterData[];
}

export interface StatusMasterData{
    statusId: number;
    statusName: string;
}

export interface RolesMasterData{
    roleId: number;
    roleName: string;
}

export interface WorkGroupMasterData{
    workGroupId: number;
    workGroupName: string;
}
export interface LoginInterface {
    actionResult: string;
    actionStatus: string;
    plmUserModel: PlmUserModel[];

}

export interface User {
email: string;
password: string;
}

export interface PlmUserModel {
    userId: string;
    firstname: string;
    lastName: string;
    roleId: string;
    pwd: string
    email: string;
    lastLogon: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    userStatusId: number;
    plmWorkGroupModelLst: PlmWorkGroupModelLst[];
    plmUserStatusModel: PlmUserStatusModel[];
    userRoleModelLst: UserRoleModelLst[];

}

export interface PlmWorkGroupModelLst {
    workGroupId: string;
    workGroupName: string;
    isDefualt: string;
}

export interface PlmUserStatusModel {
    statusId: string;
    statusName: string;
}

export interface UserRoleModelLst {
    roleId: string;
    roleName: string;
    desc: string;
    plmUser: PlmUser[];
}

export interface PlmUser {

}
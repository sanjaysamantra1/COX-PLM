export interface LDAPUserSearch{
    email: string,
	givenName: string,
	displayName: string,
	uid: string,
	cn: string
}

export interface AddNewUserRequest{
	email: string, 
	roleId: number,
	firstName: string,
	lastName: string,
	statusId: number,
	workGroupId: number[],
	defaultWorkGroup: number[],
  createdBy: string;
}

export interface AddNewUserResponse{
    actionResult: string,
    actionStatus: string,
    userRoles: string[],
    userStatus: string[],
    workGroupModels: string[],
    defaultWorkGroupModels: string[]
}

interface UserRole{
    roleId: string,
    roleName: string,
    desc: string,
    plmUser: any  
}

interface UserStatus{
    statusId: number,
    statusName: string
}

interface WorkGroupModel{
    workGroupId: number,
    workGroupName: string,
    workGroupDesc: string
}

interface DefaultWorkGroupModel{
    workGroupId: number,
    workGroupName: string,
    workGroupDesc: string
}

export interface AddUserFormData {
    actionResult: string,
    actionStatus: string,
    userRoles: UserRole[],
    userStatus: UserStatus[],
    workGroupModels: WorkGroupModel[],
    defaultWorkGroupModels: DefaultWorkGroupModel[]
}
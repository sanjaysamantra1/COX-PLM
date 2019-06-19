export interface IcomsInterface {
    actionResult: null;
    actionStatus: null;
    discountIcomsModel: DiscountIcomsModel[];
}

export interface DiscountIcomsModel{
    discountMapIcomsId: number;
    icomsStatusId: string;
    discountId: number;
    discountCode: string;
    description: string;
    version: string;
    assignedTo: string;
    peerReviewBy: string;
    offerSeries: string;
    discountCodeChanges: string;
    startDate: string;
    endDate: string,
    priceMethodId: string
    createdDate: string;
    discountCodeStatusId: string;
    projectCode: string;
    checked: boolean;
    selected: number;
}

export interface IcomsUserFormData {
    actionResult: string,
    actionStatus: string,
    users: Users[],
    icomsStatus: IcomsStatusMasterData[]
}

export interface Users {
    userId: number;
    createdBy: string;
    createdDate: string;
    firstname: string;
    lastname: string;
    logonId: string;
    modifiedBy: string;
    modifiedDate: string;
    statusId: number;
    roleId: number;
    lastLoginInfo: any;
    lastLogon: string;
    workGroupIds: number[];
}

export interface IcomsStatusMasterData {
    key: number;
    value: string;
}

export interface ModifyIcomsUserRequest {
    discountIcomsModel: DiscountIcomsModel[];
}

export interface ExportIcomsUserRequest {
    discountMapIcomsId: number[];
}

export interface DiscountMapIcomsIdsModel{
    discountMapIcomsId: number;
}



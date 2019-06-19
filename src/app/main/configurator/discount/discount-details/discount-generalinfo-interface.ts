export interface DiscountGeneralinfoInterface {
    discountId: string;
    discountCode: string;
    startDate: string;
    endDate: string;
    description: string;
    parentDiscountCode: string;
    replacingDiscountCode: string;
    failedSelfInstallCredit: string;
    endDateLastChange: string;
    selfInstallIncentive: string;
    Project: string;
    reviewBeforeExpirationStatus: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    notes: string;
    version: string;
    statusMasterDetailId: string;
    DiscountMasterData: DiscountMasterData[];
}


export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        Parent_Discount_Code: Records[];
        Replacing_Discount_Code: Records[];
        Project: Records[];
    },
}

export interface Records {
    key: number;
    value: string;
}

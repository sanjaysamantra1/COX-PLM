export interface DiscountCampaignCodePreReqInterface {
    preReqId: string;
    cmpgnCdAIncIfOne: string;
    cmpgnCdDExcIfAny: string;
    cmpgnCdNumOfDays: string;
    cmpgnLongDescr: string;
    curntSrvcAIncIfOne: string;
    curntSrvcBIncIfAll: string;
    curntSrvcCIncIfAtlst: string;
    curntSrvcCOfThese: string;
    curntSrvcDExcIfAny: string;
    curntSrvcEExcIfAll: string;
    curntSrvcFExcIfAtlst: string;
    curntSrvcFOfThese: string;
    icomsAccessList1: string;
    icomsAccessList2: string;
    icomsAccessList3: string;
    icomsAccessList4: string;
    icomsAccessList5: string;
    icomsAccessList6: string;
    instlSrvcAIncIfOne: string;
    instlSrvcBIncIfAll: string;
    instlSrvcCIncIfAtlst: string;
    instlSrvcCOfThese: string;
    instlSrvcDExcIfAny: string;
    instlSrvcEExcIfAll: string;
    instlSrvcFExcIfAtlst: string;
    instlSrvcFOfThese: string;
    mrktIdAIncIfOne: string;
    mrktIdDExcIfAny: string;
    otherInsrct: string;
    plgInstlAIncIfOne: string;
    plgInstlBIncIfAll: string;
    plgInstlDExcIfAny: string;
    plgRetnAIncIfOne: string;
    plgRetnDExcIfAny: string;
    retnSrvcAIncIfOne: string;
    retnSrvcBIncIfAll: string;
    retnSrvcCIncIfAtlst: string;
    retnSrvcCOfThese: string;
    retnSrvcDExcIfAny: string;
    retnSrvcEExcIfAll: string;
    retnSrvcFExcIfAtlst: string;
    retnSrvcFOfThese: string;
    discountId: string;
    preReqIcomsDataBlobs: string;
    teCodeId: string;
    teCode: string;
    teCodeDescription: string;
    teCodeOwner: string;
    DiscountMasterData: DiscountMasterData[];
}



export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        teCodeResponse: Records[];

    },
}

export interface Records {

    teCodeId: 100,
    code: string;
    description: string;
    owner: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    notes: string;
    recordId: number;
    recordOwner: string;
    type: string;
}

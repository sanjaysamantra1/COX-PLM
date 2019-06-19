export interface DiscountOscarInterface {

    
    financeBucketProgCdId: string;
    salesAdvise: string;
    ccSalesAdviseFormula: string;
    mrktIdDescrId: string;
    oscarId: string;
    adviceFormula: string;
    createdDate: string;
    excldProjectionFlg: string;
    expiredFlg: string;
    globalActive: string;
    mrktId: string;
    proactive: string;
    saRequired: string;
    stableDuration: string;
    spclHandlingInstrId: string;
    marginBucketId: string;
    statusId: string;
    discountId: string;
    dataAdded: string;
    value: string;
    estimated: string;
    discountType: string;
    prismRestricted: string;
    DiscountMasterData: DiscountMasterData[];

}

export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        OSCAR_STATUS: Records[];
        FINANCE_BUCKET_PROG_CD: Records[];
    },
}

export interface Records {
    key: number;
    value: string;
}
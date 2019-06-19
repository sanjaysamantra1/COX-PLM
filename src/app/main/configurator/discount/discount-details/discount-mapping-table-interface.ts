export interface DiscountMappingTableInterface {
    offerFamilyId: string;
    financeBucketCdId: string;
    programNmId: string;
    customerTargetId: string;
    discountType: string;
    discountSubType: string;
    minVideoTierId: string;
    minDataTierId: string;
    minPhoneTierId: string;
    minHomeLifeTierId: string;
    productId: string;
    psuRequired: string;
    numberOfPsu: string;
    primaryDuration: string;
    secondryDuration: string;
    secondryStepupAmount: string;
    retailRate: string;
    mrc: string;
    discountId: string;
    discount: string;
    saTypeRequiredId: string;
    installIncludeId: string;
    marketName: string;
    mappingId: string;
    stepupAmount: string;
    campaignTypeId: string;
    campaignSubTypeId: string;
    DiscountMasterData: DiscountMasterData[];
}


export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        OFFER_FAMILY: Records[];
        FINANCE_BUCKET_PROG_CD: Records[];
        PROGRAM_NM: Records[];
        CUSTOMER_TARGET: Records[];
        DISCOUNT_TYPES: Records[];
        DISCOUNT_SUB_TYPES: Records[];
        MIN_VIDEO_TIER: Records[];
        MIN_DATA_TIER: Records[];
        MIN_PHONE_TIER: Records[];
        MIN_HOME_LIFE_TIER: Records[];
        PRODUCT: Records[];
        PSU_REQUIRED: Records[];
        SA_TYPE_REQUIRED: Records[];
        INSTALL_INCLUDED: Records[];

    },
}

export interface Records {
    key: number;
    value: string;
}

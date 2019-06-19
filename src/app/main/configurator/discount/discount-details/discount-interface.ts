export interface FetchAllIntakeRequest {
    intakeRequestCode: string;
    intakeRequestType: string;
    requestStartDate: string;
    requestCompletionDate: string;
    description: string;
    sites: Number[];
    pricingOwner: string;
    createdDate: string;
    status: string;
    assignedTo: string;
}

export interface AddDiscountFormMasterData {
    actionResult: string;
    actionStatus:string;
    commonMasterData: CommonMasterData[];
    TECodeResponse: TECodeResponse[];
}

export interface CommonMasterData {
    name: string;
    records: Records[];
}

export interface Records {
    key: number;
    value: string;
}


export interface GetIcomsStatus {
    itDiscountChanges: string;
    offerSeries: string;
    itPeerReviewedDate: [string];
    icomsStatus: [string];
    itPeerReviewed: [string];
    itAssignedTo: [string];
}

export interface GetIcomsStatusResponse {
    actionResult: string;
    actionStatus: string;
    GetIcomsStatus: GetIcomsStatus[];
}


export interface GetDiscountBuilder {
    discriptionFormula: string;
    amount: string;
    discountType: string;
    videoTires: [string];
    dataTires: [string];
    phoneTires: [string];
    homeLifeTires: [string];
    ancillaryFeatures: [String];
    equipment: [string];
    install: [string];
}

export interface GetDiscountBuilderResponse {
    actionResult: string;
    actionStatus: string;
    GetDiscountBuilder: GetDiscountBuilder[];
}


export interface GetDiscountGiftCard {
    validationToolStatus: [string];
}

export interface GetDiscountGiftCardResponse {
    actionResult: string;
    actionStatus: string;
    GetDiscountGiftCard: GetDiscountGiftCard[];
}




export interface GetCampaignCodePricingPreReq {
    serviceCodeCheatSheet: [string];
}

export interface GetCampaignCodePricingPreReqResponse {
    actionResult: string;
    actionStatus: string;
    GetCampaignCodePricingPreReq: GetCampaignCodePricingPreReq[];
}

export interface GetMappingTableResponse {
    actionResult: string;
    actionStatus: string;
    GetMappingTable: GetMappingTable[];
}



export interface GetOSCAR {
    oscarStatus: [string];
    financeBucketProgCD: [string];
    specialHandlingInstructions: [string];
    marginBucket: [string];
    marketingId: [string];
}

export interface GetOSCARResponse {
    actionResult: string;
    actionStatus: string;
    GetOSCAR: GetOSCAR[];
}



export interface GetMainPageData {
    mpNew: [string];
    mpOfferType: [string];
    mpOfferProduct: [string];
    mpTargetAudience: [string];
    mpInstallation: [string];
}

export interface GetMainPageDataResponse {
    actionResult: string;
    actionStatus: string;
    GetMainPageData: GetMainPageData[];
}

export interface GetOnlineData {
    onlineStatus: [string];
}

export interface GetOnlineResponse {
    actionResult: string;
    actionStatus: string;
    GetOnlineData: GetOnlineData[];
}
//  New Interface started from here 


// Discount General Info Interface

export interface GetDiscountGeneralInformation {
    discountId: number;
    createdByUser: string;
    createdDate: string;
    description: string;
    discountCode: string;
    endDate: string;
    modifiedDate: string;
    notes: string;
    startDate: string;
    version: string;
    sites: string;
    projectCode: string;
    type: string;
    status: number;
    parentCampaignId: number;
    replacingCampaignId: number;
    failedSelfInstalledCredit:string;
    endDateLastChange: string;
    selfInstallIncentive: string;
    active: boolean;
    future: boolean;
    projectId: string;
    reviewBeforeExpirationStatusId: number;
}

export interface discountSiteIds {
    discountSiteIds: string;
}

export interface parentDiscountCode {
    parentDiscountCode: string;
}

export interface replacingDiscountCode {
    replacingDiscountCode : string;
}

export interface Project {
    Project: string;
}

// Discount Discription Builder Interface 
export interface GetDiscriptionBuilder {
    descrBuildId: number;
    amount: string;
    formula: string;
    dataTierId: string;
    phoneTierId: string;
    hmLifeTierId: string;
    equipmentId: string;
    installId: string;
    videoTierId: string;
    ancillaryFeatureId: string;
    discountId: string;
    discountTypeId: string;
}

// ICOMS Interface
export interface GetDiscountIcomsStatus {
    discountMapIcomsId: string;
    assignedTo: string;
    confirmDate: string;
    notes: string;
    offerSeries: string;
    discountChanges: string;
    peerReviewData: string;
    icomsStatusModel: IcomsStatusModel[];
}

export interface IcomsStatusModel {
    icomsStatusId: string;
    icomsStatusName: string;
}

// Discount Gift Card Interface
export interface DiscountGift {
    discountMapGiftId: string;
    giftcardAmount: string;
    included: string;
    notes: string;
    validationToolStatus: ValidationToolStatus[];
}



export interface ValidationToolStatus {
    ValidationToolStatus: string;
}


// PreReq
export interface DiscMapPreRequisite {

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
    uploadteCodeDocId: string;
   TECODERESPONSE: TECodeResponse[];
}

// Oscar
export interface DiscMapOscar {

    oscarId: string;
    adviceFormula: string;
    createdDate: string;
    excldProjectionFlg: string;
    expiredFlg: string;
    globalActive: string;
    mrktId: string;
    proactive: string;
    saRequired: string;
    salesAdvise: string;
    stableDuration: string;
    financeBucketProgCdId: string;
    spclHandlingInstrId: string;
    marginBucketId: string;
    mrktIdDescrId: string;
    statusId: string;
    discountId: string;
    ccSalesAdviseFormula: string;
    dataAdded: string;
    value: string;
    estimated: string;
    discountType: string;
    prismRestricted: string;


}

// Main Page
export interface GetDisMapMainPage {
    mainPageId: string;
    mpMarkets: string;
    mpNotes: string;
    mpOffer: string;
    mpOfferDetailsRestrict: string
    mpPrismCode: string;
    mpSalesChannel: string;
    showMainpageFlg: string;
    mpOfferProductId: string;
    mpTargetedAudienceId: string;
    mpInstallationTprId: string;
    mpNewExistingId: string;
    mpOfferTypeId: string;
    discountId: string;
    mainPageChnlMaps: string;
    sites: Sites[];
    mpNewDropDownList: mpNewDropDownList[];
    mpOfferProduct: MpOfferProduct[];
    mpOfferType: mpOfferType[];
    mpTargetedAudience: mpTargetedAudience[];
    mpInstallation: mpInstallation[];
}

export interface Sites {
    sitesId: string;
    sitesName: string;
}

export interface mpNewDropDownList {
    mpNewDropDownList: string;
}

export interface MpOfferProduct {
    MpOfferProduct: string;
}

export interface mpOfferType {
    mpOfferType: string;
}

export interface mpTargetedAudience {
    mpTargetedAudience: string;
}

export interface mpInstallation {
    mpInstallation : string;
}


// Online

export interface GetDiscMapOnline {
    discOnlineMapId: string;
    disclaimer: string;
    ecomPromoCode: string;
    savingsSticker: string;
    uptierValues: string;
    onlineStatusId: string;
}

// Mapping Table 

export interface GetMappingTable {
    mappingId: string;
    discountId: string;
    discount: string;
    marketName: string;
    mrc: string;
    numberOfPsu: string;
    primaryDuration: string;
    psuRequired: string;
    retailRate: string;
    secondryDuration: string;
    secondryStepupAmount: string;
    stepupAmount: string;
    financeBucketCdId: string;
    programNmId: string;
    customerTargetId: string;
    campaignTypeId: string;
    campaignSubTypeId: string;
    minDataTierId: string;
    minPhoneTierId: string;
    minHomeLifeTierId: string;
    productId: string;
    saTypeRequiredId: string;
    installIncludeId: string;
    offerFamilyId: string;
    minVideoTierId: string;
}

export interface GetCampaignCodePricingMethod {
    percentOfNormalRate: string;
    associatedRateUntill: string;
    associateRateBillday: string;
    pricingMethod: string;
}


//  Discount Master Data Interface Started from Here 

export interface DiscountFormMasterData {
    actionResult: string;
    actionStatus: string;
    commonData: commonData[];
    markets: Object;
    sites: Object;
    TECODERESPONSE: TECodeResponse[];
}

export interface commonData {
    name: string;
    records: Records[];
}

export interface Records {
    key: number;
    value: string;
}

export interface DiscountFormDropDown {
    VIDEO_TIERS: Records[];
    PHONE_TIERS: Records[];
    HOMELIFE_TIERS: Records[];
    ANCILLARY: Records[];
    EQUIPMENT: Records[];
    INSTALL: Records[];
    GIFT_VALIDATION_STATUS: Records[];
    OFFER_FAMILY: Records[];
    FINANCE_BUCKET_CD: Records[];
    PROGRAM_NM: Records[];
    CUSTOMER_TARGET: Records[];
    CAMPAIGN_TYPE: Records[];
    CAMPAIGN_SUBTYPE: Records[];
    SA_TYPE_REQUIRED: Records[];
    INSTALL_INCLUDED: Records[];
    PRODUCT: Records[];
    OSCAR_STATUS: Records[];
    FINANCE_BUCKET_PROG_CD: Records[];
    SPCL_HANDLING_INSTRUCTIONS: Records[];
    MARGIN_BUCKET: Records[];
    MARKETING_ID_DESC: Records[];
    MP_NEW_EXISTING: Records[];
    MP_OFFER_PRODUCT: Records[];
    MP_OFFER_TYPE: Records[];
    MP_TARGETED_AUDIENCE: Records[];
    MP_INSTALLATION_TPR: Records[];
    ONLINE_STATUS: Records[];
    PRICING_CATEGORY: Records[];
    PRICING_METHOD: Records[];
    PRESENTATION_CODE: Records[];
    MARKETING_ID: Records[];
    ICOMS_STATUS: Records[];
    IT_PEER_REVIWED: Records[];
    IT_ASSIGNED_TO: Records[];
    DISCOUNT_TYPES: Records[];
    DISCOUNT_SUB_TYPE: Records[];
    DATA_TIRES: Records[];
    MIN_VIDEO_TIER: Records[];
    MIN_DATA_TIER: Records[];
    MIN_PHONE_TIER: Records[];
    MIN_HOME_LIFE_TIER: Records[];
    MARKETS: Records[];
    MARKETSObj: Object;
    SITESObj: Object;
    TECODERESPONSE: TECodeResponse[];
    Parent_Discount_Code: Records[];
    Replacing_Discount_Code: Records[];
    Project: Records[];


}

export interface TECodeResponse {
    teCodeId: number;
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

export interface TeCode {
    actionResult: string;
    actionStatus: string;
    teCodes: TeCodes[];

}

export interface TeCodes {
    teCodeId: string;
    code: string;
    description: string;
    owner: string;
}


export interface SubmitDiscountInfo {
    discriptionBuilder: GetDiscriptionBuilder;
    discountIcomsStatus: GetDiscountIcomsStatus;
    discountGift: DiscountGift;
    discMapPreRequisite: DiscMapPreRequisite;
    discMapOscar: DiscMapOscar;
    disMapMainPage: GetDisMapMainPage;
    discMapOnline: GetDiscMapOnline;
    mappingTable: GetMappingTable;
    // discountFormMasterData: DiscountFormMasterData;
    discountFormDropDown: DiscountFormDropDown;
}
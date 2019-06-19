// New Intake Request Interface starts

export interface EditViewIntakeRequestForm {
    actionResult: string;
    actionStatus: string;
    projectMasterModel: ProjectMasterModel;
}

export interface IntakeRequestForm {
    isSubmitted: Boolean;
    projectMasterModel: ProjectMasterModel;
}

export interface AddUpdateIntakeRequestSubmitSaveResponse {
    actionResult: string;
    actionStatus: string;
    isSubmitted: Boolean;
    projectMasterModel: ProjectMasterModel;
}

export interface ProjectMasterModel {
    projectCode: string;
    projectTypeId: string;
    projectStartDt: string;
    projectEndDt: string;
    intakeReqName: string;
    intakeRequestStatusId: string;
    pricingOwnerId: string;
    requesterName: string;
    pricingOwnerNotes: string;
    requesterEmail: string;
    trgtAudienceId: string;
    popsNotes: string;
    channelIds: string[];
    categoryId: string;
    addUptierPaths: string;
    productIds: string[];
    priorityId: string;
    sites: number[];
    description: string;
    uploadIntakeRequestDoc: any;
    uploadIntakeRequestDocId: any;
    uploadIntakeRequestDocName: any;
    intakeFormReqTxnDetModel: IntakeRequestFormIntakeForm;
}

export interface IntakeRequestFormIntakeForm {
    campCodeIds: string[];
    stepupDuratnId: string;
    stepupAmount: string;
    discountStartDate: string;
    discountExpireDate: string;
    durationMonths: string;
    requirePlgId: string;
    prodMustInc: string;
    prodMustExc: string;
    prodMustRetainInc: string;
    prodMustRetainExc: string;
    instltnIncFlg: boolean;
    instltnIncFlgVal: boolean;
    instltnPricing: string;   
    prodMustInstlExc: string;
    tireqIds: string[];
}

// New Intake Request Interface Ends

// Poorna Started New InterFace Created from Here 

//Requestor Request Interface
export interface RequestorRequestInterface {
    projectCode: string;
    projectType: string;
    projectStatus: string;
    projectStartDt: string;
    projectEndDt: string;
    description: string;
    market: Markets[];
    status: string;
    assignedTo: string;
    sites: string[];
    mapProjectTypes: Map<string, string>;
    mapMarketList: Map<string, string>;
    intakeFormResp: IntakeFormReq;
}

//Requestor Response Interface
export interface RequestorResponseInterface {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    projectType: string;
    projectStatus: string;
    projectStartDt: string;
    projectEndDt: string;
    description: string;
    market: Markets[];
    status: string;
    assignedTo: string;
    sites: string[];
    mapProjectTypes: Map<string, string>;
    mapMarketList: Map<string, string>;
    intakeFormResp: IntakeFormResp;
}

export interface IntakeRequestMasterData {
    actionResult: string;
    actionStatus: string;
    intakeFormMasterDropDown: {
        INTAKE_REQUEST_TYPE: IntakeFormMasterDropDownFieldObj[];
        REQUIRE_PLG: IntakeFormMasterDropDownFieldObj[];
        INTAKE_REQUEST_STATUS: IntakeFormMasterDropDownFieldObj[];
        INTAKE_CATEGORY: IntakeFormMasterDropDownFieldObj[];
        TARGET_AUDIENCE: IntakeFormMasterDropDownFieldObj[];
        TIER_REQUIREMENTS: IntakeFormMasterDropDownFieldObj[];
        CHANNELS: IntakeFormMasterDropDownFieldObj[];
        INTAKE_PRIORITY: IntakeFormMasterDropDownFieldObj[];
        STEPUP_DURATION: IntakeFormMasterDropDownFieldObj[];
        TE_CODE: IntakeFormMasterDropDownFieldObj[];
    },
    campaignCodesList: CampaignCodesListObj[],
    mapMarketList: Map<string, string>;
    pricingOwners: PricingOwner[];
    products: Product[];
}

export interface CampaignCodesListObj {
    key: string;
    value: string;
}

export interface IntakeFormMasterDropDownFieldObj {
    intakeFormDrpdwnDetailId: Number;
    objectName: string;
    intakeFormDrpdwnMasterId: Number;
    intakeFormDrpdwnMasterObjectName: string;
}

export interface PricingOwner {
    userId: Number;
    createdBy: string;
    createdDate: string;
    firstname: string;
    lastname: string;
    logonId: string;
    modifiedBy: string;
    modifiedDate: string;
    lastLoginInfo: string;
    statusId: Number;
    roleId: string;
    workGroupIds: string;
    lastLogon: string;
}

export interface Product {
    psuTypeId: string;
    psuName: string;
    description: string;
}

//Intake Request Interface
export interface IntakeFormReq {
    intakeFormId: string;
    addUptierPaths: string;
    description: string;
    durationMonths: string;
    instltnIncFlg: boolean;
    instltnPricing: string;
    prodMustExc: string;
    prodMustInc: string;
    prodMustInstlExc: string;
    prodMustInstlInc: string;
    prodMustRetainExc: string;
    prodMustRetainInc: string;
    products: string;
    projectName: string;
    reqstdExpireDate: string;
    reqstdStartDate: string;
    reqstorEmail: string;
    reqstorName: string;
    stepupAmount: string;
    intakeChnlModel: number;
    stepUpDuration: number;
    intakeMktModel: number;
    intakeReqPlg: number;
    intakeTecode: number;
    intakeTgtaud: number;
    intakeTirequirement: number;
}

//Intake Response InterFace
export interface IntakeFormResp {
    intakeFormId: string;
    addUptierPaths: string;
    description: string;
    durationMonths: string;
    instltnIncFlg: string;
    instltnPricing: string;
    prodMustExc: string;
    prodMustInc: string;
    prodMustInstlExc: string;
    prodMustInstlInc: string;
    prodMustRetainExc: string;
    prodMustRetainInc: string;
    products: string;
    projectName: string;
    reqstdExpireDate: string;
    reqstdStartDate: string;
    reqstorEmail: string;
    reqstorName: string;
    stepupAmount: string;
    intakeChnlModel: IntakeChnlModel[];
	intakeDurtnModel: IntakeDurtnMasterModel[];
	intakeMktModel: IntakeMktMasterModel[];
	intakeReqPlgModel: IntakeReqPlgMasterModel[];
	intakeTecodeModel: IntakeTecodeMasterModel[];
	intakeTgtaudModel: IntakeTgtaudMasterModel[];
	intakeTireqModel: IntakeTireqMasterModel[];
}

export interface IntakeChnlModel {
    chnlId: number;
    chnlName: string;
}

export interface IntakeDurtnMasterModel {
    durtnId: number;
    duration: string;
}

export interface IntakeMktMasterModel {
    mktId: number;
    mktName: string;
}

export interface IntakeReqPlgMasterModel {
    reqId: number;
    plgFlag: string;
}

export interface IntakeTecodeMasterModel {
    tecode: number;
    tecodeName: string;
}

export interface IntakeTgtaudMasterModel {
    tgtId: number;
    tgtName: string;
}

export interface IntakeTireqMasterModel {
    tierId: number;
    tierName: string;
}


export interface Markets {
    projSiteMapId: number;
    projectCode: string;
    siteId: number;
    enableFlag: string;
}

export interface MapProjectTypes {
    mapProjectTypeId: number;
    mapProjectTypeName: string;
}


export interface MapMarketList {
    mapMarketId: string;
    mapMarketName: string;
}


//MarketingOffers-Request interface
export interface MarketingOffersRequest {
    projectCode: string;
    offerId: number;
    offerType: string;
    offerDescription: string;
    offerStartDate: string;
    offerEndDate: string;
    psyTypeModelList: PsyTypeModelList[]
    price: string;
    priceSpec: string;
    discountValue: string;
    discountTypeId: number;
    discountRule: string;
    psuType: string;
	bundleType: string;
}


export interface PsyTypeModelList {
    psuTypeId: number;
    psuName: string;
    description: string;
}

//MarketingOffers-Response interface
export interface MarketingOfferResponse {
    actionResult: string;
    actionStatus: string;
    projectMasterModel: ProjectMasterModel;
    mrktingOfferModel: AddMrktingOfferModel[];
    discTypeMasterModel: DiscTypeMasterModel[];
    mktOffrDiscountMasterModel: MktOffrDiscountMasterModel[];
    psuTypeDetailModelMap: Map<string,PsuTypeDetailModelMap[]>;
}

export interface AddMrktingOfferModel {
    moId: string;
    projectCode: string;
    createdBy: string;
    createdDate: string;
    description: string;
    discValue: string;
    endDate: string;
    modifiedDate: string;
    offerType: string;
    price: number;
    priceSpec: string;
    startDate: string;
	discountTypeId: number;
	discountRule: string;
	psuType: string;
	bundleType: string;
    supplementaryRule: string;
    moProductDataModel: MoProductDataModel[];
    currencyId: string;
    bundleMasterModel: BundleMasterModel;
    currencyMasterModel: CurrencyMasterModel;
    mktOffrDiscountMasterModel: MktOffrDiscountMasterModel;
    projectMasterModel: ProjectMasterModel;
}

export interface MoProductDataModel {
    prodDataId: string;
    prodDetail: string;
    psuType: string;
    mrktingOfferTxnDetModel: Object[];
    psuTypeMasterModel: PsuTypeMasterModel;
}

export interface BundleMasterModel {
    bndlId: number;
    bndlName: string;
}

export interface CurrencyMasterModel {
    currencyId: number;
    currencyName: string;
}

export interface DiscTypeMasterModel {
    discTypeId: number;
    discTypeName: string;
}
export interface MktOffrDiscountMasterModel {
    discTypeId: string;
    discTypeName: string;

}

export interface PsuTypeDetailModelMap {
    psuTypeId: string;
    psuName: string;
    description: string;

}

// Add New Project Request Interface
export interface AddUpdateProjectRequest {
    projectCode: string;
    projectType: string;
    projectStartDt: string;
    projectEndDt: string;
    market: number[];
    description: string;
    intakeFormReq: IntakeFormReq[];
}

// Add new Project Response Interface
export interface AddUpdateProjectResponse {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    projectType: string;
    projectStatus: string;
    projectStartDt: string;
    projectEndDt: string;
    description: string;
    market: Markets[];
    status: string;
    assignedTo: string;
    sites: string[];
    mapProjectTypes: Map<string, string>;
    mapMarketList: Map<string, string>;
    intakeFormResp: IntakeFormResp;
}

export interface PsuTypeMasterModel {
    psuTypeId: string;
    psuName: string;
    description: string;
}

// psuTypes-Response  Interface started from here 

export interface PsuTypesResponse {
    actionResult: string;
    actionStatus: string;
    psuTypeId: string;
    psuName: string;
    description: string;
    psuTypes: PsuTypes[];
}


export interface PsuTypes {
    Data: string;
    Phone: string;
    Video: string;
    Homelife: string;
}

export interface ProjectTypeModel {
    projectTypeId: string;
    projectTypeName: string;
}

//Modify Marketing Offer interface
export interface ModifyMarketingOffer {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    projectMasterModel: ProjectMasterModel;
    mrktingOfferModel: ViewAddMrktingOfferModel[];
}

export interface GetMarketingOffer {
    offerCode: string;
    offerType: string;
    bundleType: string;
    offerStartDate: string;
    offerEndDate: string;
    offerDescription: string;
    dataProductType: string;
    phoneProductType:string;
    videoProductType:string;
    homelifeProductType:string;
    price: string;
    priceSpec: string;
    discountType: string;
    discountValue: string;
    discountDuration: string;
    discountRule: string;
  }


// viewMarketingProj-request interface started from here 

export interface ViewMarketingProjRequest {
    projectCode: string;

}

// viewMarketingProj-response  intereface started from here 

export interface ViewMarketingProjResponse {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    projectMasterModel: ProjectMasterModel[];
    mrktingOfferModel: string;
    mrktingOfferModelMap: Map<string, ViewAddMrktingOfferModel[]>;
}

export interface ViewAddMrktingOfferModel {
    moId: string;
    projectCode: string;
    createdBy: string;
    createdDate: number;
    description: string;
    discValue: string;
    endDate: string;
    modifiedDate: number;
    offerType: string;
    price: number;
    priceSpec: string;
    startDate: string;
	discountTypeId: number;
	discountRule: string;
	psuType: string;
	bundleType: string;
    moProductDataModel: MoProductDataModel[];
    currencyId: string;
    bundleMasterModel: BundleMasterModel;
    currencyMasterModel: CurrencyMasterModel;
    mktOffrDiscountMasterModel: MktOffrDiscountMasterModel;
}


// viewProject-Request  Interface started from here 

export interface ViewProjectRequest {
    projectCode: string;
}

// ViewProject-Response Interface started from  here 

export interface ViewProjectResponse {
    projectCode: string;
    projectMasterModel: ProjectMasterModel[];
    mrktingOfferModel: AddMrktingOfferModel[];
}

// defaultMarketingData-Response  Interface started from Here 

export interface DefaultMarketingDataResponse {
    actionResult: string;
    actionStatus: string;
    projectMasterModel: ProjectMasterDefaultModel[];
    mrktingOfferModel: MrktingOfferDefaultModel[];
    discTypeMasterModel: DiscDefaultTypeMasterModel[];
    mktOffrDiscountMasterModel: MktOffrDefaultDiscountMasterModel[];
    psuTypeDetailModelMap: PsuTypeDefaultDetailModelMap[];


}

export interface ProjectMasterDefaultModel {
    projectCode: string;
    projectType: string;
    projectTypeName: string;
    projectDesc: string;
    projectStartDt: string;
    projectEndDt: string;
    market: [number];
    status: string;
    statusName: string;
    assignedTo: string;
    processId: number;
    siteMap: object;
}

export interface MrktingOfferDefaultModel {
    moId: string;
    createdBy: string;
    createdDate: string;
    description: string;
    discValue: string;
    endDate: string;
    modifiedDate: string;
    offerType: string;
    price: number;
    priceSpec: string;
    startDate: string;
    supplementaryRule: string;
    moProductDataModel: MoProductDataDefaultModel[];
    bundleMasterModel: BundleDefaultMasterModel[];
    currencyMasterModel: CurrencyDefaultMasterModel[];
    mktOffrDiscountMasterModel: MktOffrDiscountDefaultMasterModel[];
    projectMasterModel: ProjectDefaultMasterModel[];
}

export interface MoProductDataDefaultModel {
    prodDataId: string;
    prodDetail: string;
    psuType: string;
    mrktingOfferTxnDetModel: Object;
    psuTypeMasterModel: PSUTypeDefaultMasterModel[];

}

// export interface MrktingOfferDefaultTxnDetModel {

// }

export interface PSUTypeDefaultMasterModel {
    psuTypeId: string;
    psuName: string;
    description: string;
}

export interface BundleDefaultMasterModel {
    bndlId: string;
    bndlName: string;
}

export interface CurrencyDefaultMasterModel {
    currencyId: string;
    currencyName: string;
}

export interface MktOffrDiscountDefaultMasterModel {
    discTypeId: string;
    discTypeName: string;
}

export interface ProjectDefaultMasterModel {
    projectCode: string;
    projectType: string;
    projectTypeName: string;
    projectDesc: string;
    projectStartDt: string;
    projectEndDt: string;
    market: [number];
    status: string;
    statusName: string;
    assignedTo: string;
    processId: string;
    siteMap: object;
}

export interface DiscDefaultTypeMasterModel {
    discTypeId: number;
    discTypeName: string;
}

export interface MktOffrDefaultDiscountMasterModel {
    discTypeId: string;
    discTypeName: string;
}

export interface PsuTypeDefaultDetailModelMap {
    psuTypeId: number;
    psuName: string;
    description: string;
}


// Add_Project_Master_Data  Interface started from Here 

export interface AddProjectMasterData {
    projectCode: string;
    projectStartDt: string;
    projectEndDt: string;
    description: string;
    mapProjectTypes: object;
    mapMarketList: object;
    intakeFormResp: IntakeFormMasterDataResp[];
}

export interface IntakeFormMasterDataResp {
    intakeFormId: string;
    addUptierPaths: string;
    description: string;
    durationMonths: string;
    instltnIncFlg: string;
    instltnPricing: string;
    prodMustExc: string;
    prodMustInc: string;
    prodMustInstlExc: string;
    prodMustInstlInc: string;
    prodMustRetainExc: string;
    products: string;
    projectName: string;
    reqstorEmail: string;
    reqstorName: string;
    stepupAmount: string;
    intakeChnlModel: IntakeChnlMasterDataModel[];
    intakeDurtnModel: IntakeDurtnMasterDataModel[];
    intakeMktModel: IntakeMktDataMasterModel[];
    intakeReqPlgModel: IntakeReqPlgDataMasterModel[];
    intakeTecodeModel: IntakeTecodeDataMasterModel[];
    intakeTgtaudModel: IntakeTgtaudDataMasterModel[];
    intakeTireqModel: IntakeTireqDataMasterModel[];
}

export interface IntakeChnlMasterDataModel {
    chnlId: number;
    chnlName: string;
}

export interface IntakeDurtnMasterDataModel {
    durtnId: number;
    duration: string;
}

export interface IntakeMktDataMasterModel {
    mktId: number;
    mktName: string;
}

export interface IntakeReqPlgDataMasterModel {
    reqId: number;
    plgFlag: string;
}

export interface IntakeTecodeDataMasterModel {
    tecode: number;
    tecodeName: string;
}

export interface IntakeTgtaudDataMasterModel {
    tgtId: number;
    tgtName: string;
}

export interface IntakeTireqDataMasterModel {
    tierId: number;
    tierName: string;
}


// Fetch_All_Projects  Interface started from Here 
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

export interface SubmitProjectInfo{
    projectCode: string;
}


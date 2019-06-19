import { expand } from 'rxjs/operators/expand';
import { Discount } from '../../discount/discount-details/discount';

/* Offer form Project Interface starts here */
export interface GetofferFromProjectResponse {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    offerId:string;
    offerName:string;
    offerType: string;
    bundleType: string;
    offerStartDate: string;
    offerEndDate: string;
    offerDescription: string;
    psuType: GetPsuData[];
    price: string;
    priceSpec: string;
    discountType: string;
    discountValue: string;
    discountDuration: string;
    discountRule: string;
}

export interface GetPsuData {
    productGroup: string;
    productID: string;
    productName: string;
}
/* Offer form Project Interface ends here */


/* Offer form General Info Starts here */
export interface GetGeneralInfoInterfaceResponse {
    actionResult: string;
    actionStatus: string;
    offerId: string;
    offerName: string;
    offerDescription: string;
    offerBundle: Records[];
    offerCategory: Records[];
    offerStartDate: string;
    offerEndDate: string;
    lastUpdateDate: Date;
    infoTestDate: string;
    testDate: Date;
    productionLauanchDate: Date;
    offerStatus:Records[];
    vesion: string;
    createdByUser: string;
    sites: number[] ;
    salesAdvise: string;
}
/* Offer form General Info ends here */

/* Master Drop down interface starts here */
export interface OfferFormMasterData {
    actionResult: string;
    actionStatus:string;
    commonMasterData: CommonMasterData[];
    discountResponse: DiscountAssoResponse;
    productResponse: ProductAssoResponse;
    markets: Object;
    products: Products[];
    discounts: Discounts[];
    eligibilityRules: EligiblityRules[];
    relevancyRules: RelevancyRules[];
}

export interface Products {
    category: string;
    childProducts: string;
    createdBy: string;
    createdDate: string;
    description: string;
    endDate: string;
    functionalType: string;
    icomsCd: string;
    installProtectedDate: string;
    lineOfBusiness: string;
    modifiedDate: string;
    name: string;
    prodId: number;
    productType: string;
    psu: string;
    startDate: string;
    status: string;
    tier: string;
}

export interface Discounts {
    discountId: number;
    createdBy: string;
    createdDate: string;
    description: string;
    discountCode: string;
    endDate: string;
    modifiedDate: string;
    notes: string;
    startDate: string;
    version: string;
    discountSiteIds: string;
    projectCode: string;
    statusMasterDetailId: string;
    discountIcoms: string;
    discountGift: string;
    discMapDescrBuild: string;
    discMapOscar: string;
    discMapOnline: string;
    discMappingEntity: string;
    discMapPreRequisite: string;
    discMapMainPage: string;
    campaignCode: string;
}

export interface DiscountAssoResponse {
    actionResult: string;
    actionStatus:string;
    discounts: DiscountsData[];
}

export interface DiscountsData{
    prodId: string;
    productName: string;
    productType: string;
    psu: string;
    packageCode: string; 
}

export interface ProductAssoResponse {
    actionResult: string;
    actionStatus:string;
    products: ProductsData[];
}

export interface ProductsData{
    prodId: number;
    productName: string;
    productType: string;
    psu: string;
    packageCode: string; 
}

export interface CommonMasterData {
    name: string;
    records: Records[];
}

export interface Records {
    key: number;
    value: string;
}

export interface OfferFormDropDown {
    PINPOINT_STATUS: Records[];
    CHANNELSLABEL: Records[];
    ADDON_TYPE: Records[];
    DVR: Records[];
    DATAEQUIP: Records[];
    VIDEOEQUIP: Records[];
    PSU_INSTL_TYPE: Records[];
    PSU_BASE_OFFER_ELIGI: Records[];
    RATEGRP_EXCLUSIONLIST: Records[];
    STATICINTENTLIST: Records[];
    STATICSUBINTENTLIST: Records[];
    PAYLAUNCHMODE: Records[];
    ECOM_PINPOINT_STATUS: Records[];
    BUNDLE_MASTER: Records[];
    OFFER_CATEGORY_MASTER: Records[];
    STATUS_MASTER: Records[];
    SITES: Records[];
    DISCOUNTS: Discounts[];
    PRODUCTS: Products[];
    MARKETS: Records[];
    campaignCodesList: Records[];
}


export interface Records {
    key: number;
    value: string;
}

export interface GetPsuData {
    productGroup: string;
    productID: string;
    productName: string;
}

export interface EligiblityRules {
    eligiId: number;
    rule: string;
    description: string;
    ruleSyntax: string;
}

export interface RelevancyRules {
    relId: number;
    rule: string;
    description: string;
    ruleSyntax: string;
}

/* Master Drop down interface ends here */

export interface OfferCreationResponse {
    actionResult: string;
    actionStatus:string;
    generalInfoMapTxnDet: GeneralInfoMapTxnDet[];
    offerProdMapTxnDets: OfferProdMapTxnDets[];
    offerDiscMapTxnDets: OfferDiscMapTxnDets[];
    offerRelRuleTxnDets: OfferRelRuleTxnDets[];
    offerEligRuleTxnDets: OfferEligRuleTxnDets[];
    offerPinpointTxnDets: OfferPinpointTxnDets[];
    offrEcommPinpntTxnDets: OffrEcommPinpntTxnDets[];
}

export interface OfferModel {
    generalInfoMapTxnDet: GeneralInfoMapTxnDet[];
    offerProdMapTxnDets: OfferProdMapTxnDets[];
    offerDiscMapTxnDets: OfferDiscMapTxnDets[];
    offerRelRuleTxnDets: OfferRelRuleTxnDets[];
    offerEligRuleTxnDets: OfferEligRuleTxnDets[];
    offerPinpointTxnDets: OfferPinpointTxnDets[];
    offrEcommPinpntTxnDets: OffrEcommPinpntTxnDets[];
}

export interface GeneralInfoMapTxnDet{
    offerId: string;
	offerName: string;
	offerDescription: string;
    offerBundle: string;
    offerCategory: string;
    offerStartDate: Date;
    offerEndDate: Date;
    lastUpdateDate: Date;
    testDate: Date;
    productionLauanchDate: Date;
    offerStatus: string;
    version: string;
    createdByUser: string;
    salesAdvise: string;
    inactive: string;
    defaultOffer: string;
    releaseCd: string;
    sites: number[];
}

export interface OfferProdMapTxnDets{
    prodId: string;
    offrPrdMapId: string;
    name: string;
    catagory: string;
    psu: string;
    icomsCode: string;
}

export interface OfferDiscMapTxnDets{
    discountId: number;
    offrDiscountMapId: number;
    discountName: string;
    discountType: string;
    primaryFlag: string;
}

export interface OfferRelRuleTxnDets{
    id: number;
    offrRelRruleMapId: number;
    ruleName: string;
    createdDate: string;
    modifiedDate: string;
    modifiedOwner: string;
}

export interface OfferEligRuleTxnDets{
    id: number;
    offrRelEruleMapId: number;
    ruleName: string;
    createdDate: string;
    modifiedDate: string;
    modifiedOwner: string;
}

export interface OfferPinpointTxnDets{
    offrPinpointMapId: number;
    agenttypelist: string;
    anypakFlag: string;
    anypremiumFlag: string;
    campnCodeExclude: string;
    campnCodeInclude: string;
    dataequipOptnl: string;
    dvrOptional: string;
    estimatedmrc: string;
    inbaseofferFlag: string;
    instalOptnlId: string;
    mandatoryflag: string;
    ofrlevelTecode: number;
    omcOfferId: string;
    prismcodelist: string;
    prismrestrictedFlag: string;
    proactivecode: string;
    proactiveofferFlag: string;
    pylabel: string;
    receiver: string;
    phoneInstalType: number;
    hmlifeInstalType: number;
    dataInstalType: number;
    videoInstalType: number;
    baseofrHmlife: number;
    baseofrVideo: number;
    baseofrPhone: number;
    baseofrData: number;
    ratefrpExclusion: number;
    staticintentlist: number;
    subStaticintentlist: number;
    paymode: number;
    status: number;
    channelsLabel: number;
    addonType: number;
    dvr: number;
    dataEquip: number;
    videoEquip: number;
}

export interface OffrEcommPinpntTxnDets{
    offrEcomMapId: number;
    ecomOfferId: number;
    statActionprimary: string;
    statActionurlfeatured: string;
    statActurlCompGrp: string;
    statImageurlCompGroup: string;
    statImageurlfeatur: string;
    statImageurlprimary: string;
    statMsgtxtCompGrp: string;
    statMsgtxtfeatur: string;
    statMsgtxtprimary: string;
    statProductlist: string;
    statThemlist: string;
    statTreatmentlist: string;
    statusId: number;
}
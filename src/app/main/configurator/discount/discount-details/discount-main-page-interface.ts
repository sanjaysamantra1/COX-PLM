export interface DiscountMainPageInterface {
    mpSalesChannel: string;
    mpMarkets: string;
    mpOffer: string;
    mpNotes: string;
    mpOfferDetailsRestrict: string
    mainPageId: string;
    mpPrismCode: string;
    showMainpageFlg: string;
    mpOfferProductId: string;
    mpTargetedAudienceId: string;
    mpInstallationTprId: string;
    mpNewExistingId: string;
    mpOfferTypeId: string;
    discountId: string;
    mainPageChnlMaps: string;
    sites: Sites[];
    DiscountMasterData: DiscountMasterData[];
}

export interface Sites {
    sitesId: string;
    sitesName: string;
}

export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        MP_NEW_EXISTING: Records[];
        MP_OFFER_PRODUCT: Records[];
        MP_OFFER_TYPE: Records[];
        MP_TARGETED_AUDIENCE: Records[];
        MP_INSTALLATION_TPR: Records[];
    },
}

export interface Records {
    key: number;
    value: string;
}



export interface Records {
    key: number;
    value: string;
}

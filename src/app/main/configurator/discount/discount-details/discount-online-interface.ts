export interface DiscountOnlineInterface {
    discOnlineMapId: string;
    disclaimer: string;
    ecomPromoCode: string;
    savingsSticker: string;
    uptierValues: string;
    onlineStatusId: string;
    DiscountMasterData: DiscountMasterData[];
    
}

export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
       ONLINE_STATUS: Records[];
    },
}

export interface Records {
    key: number;
    value: string;
}

export interface DiscountGiftCardInterface {
     discountMapGiftId: string;
    giftcardAmount: string;
    included: string;
    notes: string;
    DiscountMasterData: DiscountMasterData[];
}


export interface DiscountMasterData {
    actionResult: string;
    actionStatus: string;
    discountMasterDropDown: {
        GIFT_VALIDATION_STATUS: Records[];
    },
}

export interface Records {
    key: number;
    value: string;
}
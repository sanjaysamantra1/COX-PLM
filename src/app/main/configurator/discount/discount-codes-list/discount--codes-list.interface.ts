export interface GetDiscountListResponse {
  actionResult: string;
  actionStatus: string;
  discounts: Discount[];
  discount: any;
}

export interface Discount {
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
  status: string;
  parentCampaignId: string;
  replacingCampaignId: string;
  failedSelfInstalledCredit: string;
  endDateLastChange: string;
  selfInstallIncentive: string;
  active: string;
  checked: boolean;
  future: string;
  projectId: string;
  reviewBeforeExpirationStatusId: string;
  discountIcoms: string;
  discountGift: string;
  discMapDescrBuild: string;
  discMapOscar: string;
  discMapOnline: string;
  discMappingEntity: string;
  discMapPreRequisite: string;
  discMapMainPage: string;
}

export interface ModifyDiscountList {
    discount: Discount[];
}

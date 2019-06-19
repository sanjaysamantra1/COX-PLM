export interface GetConfiguratorExistingPsu {
  projectCode: string;
  projectType: string;
  projectStartDate: string;
  projectEndDate: string;
  projectCategoery: string;
  site:Array<string>;
  status:string;
}

export interface CreatePsu {
  offerId: string;
  marketingOfferID: string;
  mrktingOfferId: string;
  sequenceNo: string;
  psuType: string;
  productResponse: PSUProduct[];
  specificationResponse: Specifications;
}

export interface PSUProduct{
  productGroup: string;
  productID: string;
  productName: string;
  psuTypeId: string;
  psuName: string;
  description: string;
}

export interface Specifications {
  price: string;
  discountType: string;
  discountDuration: string;
  priceSpecification: string;
  discountValue: string;
}

export interface CreateOffers {
  projectCode: string;
  offerId: string;
  startDt: string;
  releaseDt: string;
  status: string;
  releaseCd: string;
}

export interface GetOfferUnderProjects{
  offerId: string;
  name: string;
  type: string;
}

export interface GetConfiguratorExistingResponse {
    actionResult: string;
    actionStatus: string;
    getOfferUnderProject: GetOfferUnderProjects[];
    getConfiguratorProjectList: GetConfiguratorExistingPsu[];
    getConfiguratorOffersList: CreateOffers[];
}

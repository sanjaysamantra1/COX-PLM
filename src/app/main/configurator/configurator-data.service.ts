import { Injectable } from '@angular/core';
import { DiscountCampaignCodePreReqInterface } from '../configurator/discount/discount-details/discount-campaign-code-pre-req-interface';
import { DiscountGeneralinfoInterface, DiscountMasterData } from '../configurator/discount/discount-details/discount-generalinfo-interface';
import { DiscountGiftCardInterface } from '../configurator/discount/discount-details/discount-gift-card-interface';
import { DiscountIcomsStatusInterface } from '../configurator/discount/discount-details/discount-icoms-status-interface';
import { DiscountMainPageInterface } from '../configurator/discount/discount-details/discount-main-page-interface';
import { DiscountMappingTableInterface } from '../configurator/discount/discount-details/discount-mapping-table-interface';
import { DiscountOnlineInterface } from '../configurator/discount/discount-details/discount-online-interface';
import { DiscountOscarInterface } from '../configurator/discount/discount-details/discount-oscar-interface';
import { DiscountSitesInterface } from '../configurator/discount/discount-details/discount-sites-interface';

@Injectable()
export class ConfiguratorDataService {
  public configuratorProjectCode: String;
  public offerIDToModify: String;
  public isModifyOffer: Boolean;
  public marketingOfferIDToAddOffer: String;
  public isAddoffer: Boolean;
  public configuratorOfferModel: any;
   public addEditViewDiscountMode: string;
   
   
  constructor() { }

  public addEditDiscountCampaignCodePreReqInterface: DiscountCampaignCodePreReqInterface;
  public addEditDiscountGeneralinfoInterface: DiscountGeneralinfoInterface;
  public addEditDiscountGiftCardInterface: DiscountGiftCardInterface;
  public addEditDiscountIcomsStatusInterface: DiscountIcomsStatusInterface;
  public addEditDiscountMainPageInterface: DiscountMainPageInterface;
  public addEditDiscountMappingTableInterface: DiscountMappingTableInterface;
  public addEditDiscountOnlineInterface: DiscountOnlineInterface;
  public addEditDiscountOscarInterface: DiscountOscarInterface;
  public addEditDiscountSitesInterface: DiscountSitesInterface;
  public addEditDiscountMasterData : DiscountMasterData;

}

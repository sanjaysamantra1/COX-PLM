import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ConfiguratorDiscountDataService {
  public discountProjectCode: String;
  public addEditViewDiscountCode: String;
  public addEditViewDiscountMode: String;
  public addEditDiscountSubmitData: any;
  public isAddEditDiscountModified: Boolean;
  public discountMasterData: any;
  public pricingRules: any;
  public discountFileUpload: any;
  public payPercentToNormalRate: any;
  public preReqOfferTemplate: any;
  public isSubmitted: Boolean;
  public projectStatus: string;
  public teCodes: any;
  
  public descriptionBuilderAmount: Subject<string>  = new Subject<string>();
  public modifyDescriptionBuilderAmount(value) {
      this.descriptionBuilderAmount.next(value);
  }
    
  public marketList: Subject<number[]>  = new Subject<number[]>();
  public modifyMarketList(value) {
      this.marketList.next(value);
  }
    
  public pricingMethod: Subject<number>  = new Subject<number>();
  public modifyPricingMethod(value) {
      console.log(value);
      this.pricingMethod.next(value);
  }

  constructor() { }

}

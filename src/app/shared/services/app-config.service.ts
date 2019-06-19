import { Injectable, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { DiscountComponent } from '../../main/distributor/discount/discount.component';

@Injectable()
export class AppConfigService implements OnInit {
  public protocol: string;
  public host: string;
  public port: string;
  public url: string;
  public urlConstants: {};
  constructor(@Inject(DOCUMENT) private document) {
      this.protocol = document.location.protocol;
      this.host = document.location.host;
      this.port = document.location.port;
      //this.url = 'https://plm-services.dev.cox.com';
      this.url = 'http://localhost:4200';
      this.urlConstants = {
        // "PLM_LOGIN_RESPONSE": 'plm-engine/login/v0/users/authenticate',
        // 'PLM_Logout': 'plm-engine/login/v0/users/logout',	
        // 'PLM_PROJECT_DETAILS': 'plm-engine/requester/v0/project',
        // 'PLM_ADD_NEW_PROJECT_FORM': 'plm-engine/requester/v0/fetchAllIntakeMaster',
        // 'PLM_ADD_PROJECT': 'plm-engine/requester/v0/project',
        // 'PLM_UPDATE_PROJECT': 'plm-engine/requester/v0/project',
        // 'PLM_ADD_USER_FORM_DATA' : 'plm-engine/usermgmt/v0/users/details',
        // 'PLM_ADD_USER_SEARCH_USER_IN_ELDAP' : 'plm-engine/usermgmt/v0/users',
        // 'PLM_ADD_NEW_USER' : 'plm-engine/usermgmt/v0/users/addUser',
        // 'PLM_SEARCH_USER_SEARCH' : 'plm-engine/usermgmt/v0/users/search',
        // 'PLM_UPDATE_USER' : 'plm-engine/usermgmt/v0/users/modifyUsers',
        // 'PLM_DISCOUNT_PROJECT_DETAILS': 'plm-engine/requester/v0/project',
        // "PLM_DISCOUNT_DISCOUNT_LIST": 'plm-engine/configurator/v0/discount/fetchDiscounts',
        // 'PLM_ADD_DISCOUNT_MASTER_DATA' : 'plm-engine/configurator/v0/discount/fetchAllDiscountMaster',
        // 'PLM_EDIT_DISCOUNT_FORM_DATA': 'plm-engine/configurator/v0/discount/getDiscountDetails',
        // 'PLM_SUBMIT_DISCOUNT_FORM_DATA' : 'plm-engine/configurator/v0/discount/saveDiscount',
        // 'PLM_ADD_DISCOUNT_PRICING_RULES': 'plm-engine/configurator/v0/discount/getLatestPriceBook',
        // 'PLM_DISCOUNT_SEND_NOTIFICATION': 'plm-engine/configurator/v0/discount/sendNotification ',
		    // 'PLM_TECH_SYSTEM_ICOMS_LIST': 'plm-engine/plm/systems/v0/icoms',
        // 'PLM_TECH_SYSTEM_UPDATE_ICOMS_LIST': 'plm-engine/plm/systems/v0/icoms',
        // 'PLM_TECH_SYSTEM_EXPORT_ICOMS_LIST': 'plm-engine/plm/systems/v0/icoms/download',
        // 'PLM_TECH_SYSTEM_MASTER_FORM_DATA' : 'plm-engine/plm/systems/v0/icomsmaster',
        // 'PLM_ADD_DISOCCUNT_MASTER_DATA' : 'plm-engine/configurator/v0/discount/fetchAllDiscountMaster',
        // 'PLM_EDIT_DISOCCUNT_FORM_DATA': 'plm-engine/configurator/v0/discount/getDiscountDetails',
        
        // 'PLM_VIEW_PROJECT' : '/plm-engine/mktproject/v0/viewProj',
        // 'PLM_PSU_TYPES_MASTER_DATA': '/plm-engine/requestor/v0/psuType',  
        // 'PLM_PSU_OFFER_FOR_PROJECT': '/plm-engine/requester/v0/viewMarketingProj',
        // 'PLM_REMOVE_PSU': '/plm-engine/requester/v0/deleteMarketingoffer',
        // 'PLM_SUBMIT_PROJECT': '/plm-engine/requester/v0/submitmarketingoffer',
        // 'PLM_GET_ADD_MARKETING_FORM_DATA': '/plm-engine/requester/v0/defaultMarketingData',
        // 'PLM_GET_ADD_MARKETING_DATA_BY_OFFERID': '/plm-engine/requester/v0/editGetMarketingOffer',
        // 'PLM_ADD_MARKETING_DATA': '/plm-engine/requester/v0/createMarketingOffers',
        // 'PLM_UPDATE_MARKETING_DATA': '/plm-engine/requester/v0/modifyMarketingOffer',
        // 'PLM_CONFIGURATOR_PROJECT_LIST': '/plm-engine/configurator/v0/offer/fetchAllProjects',
        // 'PLM_CONFIGURATOR_PSU_OFFERLIST': 'plm-engine/configurator/v0/offer/fetchOffers',
        // "PLM_CONFIGURATOR_PSU_OFFER_RELEASE_LIST": 'plm-engine/configurator/v0/offer/createRelease',
        // 'PLM_CONFIGURATOR_OFFER_CREATION_MASETR_DROPDOWN': 'plm-engine/configurator/v0/offer/findAllOfferMaster',
        // 'PLM_CONFIGURATOR_ADD_OFFER': 'plm-engine/configurator/v0/offer/showAddOffer',
        // 'PLM_CONFIGURATOR_MODIFY_OFFER': 'plm-engine/configurator/v0/offer/viewOffer',
        // 'PLM_SUBMIT_OFFER': 'plm-engine/configurator/v0/offer/submitOffer',
        // 'PLM_SAVE_EXIT_OFFER': 'plm-engine/configurator/v0/offer/saveOffer',
        // 'PLM_CONFIGURATOR_OFFER_RELEASE_FOR_DISTRIBUTION':'plm-engine/configurator/v0/offer/createRelease',
        // 'PLM_CONFIGURATOR_PSU_DISCOUNTSLIST': 'plm-engine/configurator/v0/discount/fetchDiscounts',
        // 'PLM_CONFIGURATOR_DISCOUNTSTATUS': 'plm-engine/configurator/v0/discount/fetchDiscountStatus',
        // 'PLM_CONFIGURATOR_DISCOUNTPROJECTLIST': 'plm-engine/configurator/v0/discount/fetchDiscountProjectList',
        // 'PLM_DICOUNTS_PROJECT_LIST': 'plm-engine/configurator/v0/discount/fetchAllProjects',
																  
        // "PLM_DISCOUNT_ICOMS_EXTRACT_FOR_DISCOUNT": 'data/configurator/discount/Discount_list.json',


        "PLM_LOGIN_RESPONSE": 'data/login/Login_Response.json',
        'PLM_PROJECT_DETAILS': 'data/requestor/Fetch_All_Projects.json',
        'PLM_ADD_NEW_PROJECT_FORM': 'data/requestor/RequesterDefaultMaster.json',
         'PLM_UPDATE_PROJECT' : 'data/requestor/Fetch_Edit_Project_Data.json',
        'PLM_ADD_USER_FORM_DATA' : 'data/Admin_user_details.json',
        'PLM_ADD_MARKETING_OFFER_FORM_DATA': 'data/Add_Marketing_Offer_Form.json',        
        'PLM_ADD_USER_SEARCH_USER_IN_ELDAP' : 'data/Admin_Ldap_Search_Response.json',
        'PLM_ADD_NEW_USER' : 'data/Admin_Create_User_Response.json',
        'PLM_SEARCH_USER_SEARCH' : 'data/Admin_Search_User_Response.json',
        'PLM_UPDATE_USER' : 'data/Admin_Search_Modify_User_Response.json',
        'PLM_PSU_OFFER_FOR_PROJECT': 'data/New_Project_Create_PSU.json',
        
																						  
														
        'PLM_SEARCH_CRITERIA' : 'data/Search_Criteria.json',
        'PLM_RESPONSE_CREAT': 'data/requesterCreate.json',
        'PLM_PROJECT_DETAILS_ADD_UPDATE': 'data/Fetch_All_Projects_After_Add_Update.json',
        'PLM_MODEL_DETAILS': 'data/requestorModel.json',
        //'PLM_PSU_OFFER_FOR_PROJECT': 'data/Existing_Project_PSU.json',
        'PLM_ADD_UPDATE_PROJECT_RESPONSE': 'data/Add_Update_Project_Response.json',
        'PLM_CONFIGURATOR_PROJECT_LIST': 'data/configurator/offer/offer_projects_list.json',
        'PLM_DICOUNTS_PROJECT_LIST': 'data/configurator/discount/Discount_projects_list.json',
        'PLM_CONFIGURATOR_OFFER_CREATION_MASETR_DROPDOWN': 'data/configurator/offer/offer_master_data.json',
        'PLM_CONFIGURATOR_OFFER_CREATION': 'data/configurator/offer/offer_view_edit.json',
        'PLM_CONFIGURATOR_OFFER_RELEASE_FOR_DISTRIBUTION':'data/configurator/offer/offer_create_release.json',
        "PLM_CONFIGURATOR_PSU_OFFERLIST": 'data/configurator/offer/offers_list.json',
        "PLM_CONFIGURATOR_PSU_OFFER_RELEASE_LIST": 'data/configurator/offer/offers_create_release.json',
        "PLM_DISCOUNT_DISCOUNT_LIST": 'data/configurator/discount/Discount_list.json',
        "PLM_DISCOUNT_ICOMS_EXTRACT_FOR_DISCOUNT": 'data/configurator/discount/Discount_list.json',
        "PLM_ICOMS_UPDATE": "data/configurator/discount/Icoms_upade.json",
        'PLM_VIEW_PROJECT' : 'data/View_Project.json',
        'PLM_ADD_MARKETING_FORM_BY_OFFER_ID': 'data/Add_Marketing_Offer_Form_By_ID.json',
        'PLM_ADD_MARKETING_OFFER_RESPONSE': 'data/Add_Marketing_Offer_Response.json',
        'PLM_DISCOUNT_ICOMS_STATUS': 'data/discount.json',
        'PLM_PSU_TYPES_MASTER_DATA': 'data/Get_PSU_Type.json',
        'PLM_DISCOUNT_MASTER_ICOMS_STATUS': 'data/discountMaster.json',
																											
		'PLM_TECH_SYSTEM_ICOMS_LIST': 'data/technology-system/icoms/ICOMS_fetch_all.json',
        'PLM_TECH_SYSTEM_UPDATE_ICOMS_LIST': 'data/technology-system/icoms/ICOMS_fetch_all.json',
        'PLM_TECH_SYSTEM_EXPORT_ICOMS_LIST': 'data/technology-system/icoms/ICOMS_fetch_all.json',
        'PLM_TECH_SYSTEM_MASTER_FORM_DATA' : 'data/technology-system/icoms/ICOMS_Master_Data.json',								
        //'PLM_TECH_SYSTEM_ICOMS_LIST': 'data/technology-system/icoms/ICOMS_fetch_all.json',
        //'PLM_TECH_SYSTEM_MASTER_FORM_DATA' : 'data/technology-system/icoms/ICOMS_Master_Data.json',
        "PLM_ADD_DISCOUNT_MASTER_DATA": "data/configurator/discount/discount_codemaster_updated.json", 
        "PLM_ADD_DISCOUNT_PRICING_RULES": "data/configurator/discount/Pricebook.json", 
        "PLM_EDIT_DISCOUNT_FORM_DATA": "data/configurator/discount/Discount_view_edit.json",
        "PLM_SUBMIT_DISCOUNT_FORM_DATA": "data/configurator/discount/Discount_view_update.json",  
      };
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule,MatExpansionModule,MatAutocompleteModule,MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { Ng2PaginationModule } from 'ng2-pagination'; 
import { Ng2OrderModule } from 'ng2-order-pipe';
import { SharedModule } from '../../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import { KeysPipe } from '../configurator/pipes/keys.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { ConfiguratorRoutingModule } from './configurator-routing.module';

import { OfferComponent } from './offer/offer.component';
import { OfferBucketGridViewComponent } from './offer/offer-bucket-grid-view/offer-bucket-grid-view.component';
import { AddOfferComponent } from './offer/add-offer/add-offer.component';
import { ConfiguratorProjectListComponent } from './offer/configurator-project-list/configurator-project-list.component';
import { OfferBucketComponent } from './offer/offer-bucket-grid-view/offer-bucket/offer-bucket.component';
import { ReadyToOfferListComponent } from './offer/offer-bucket-grid-view/ready-to-offer-list/ready-to-offer-list.component';
import { GeneralInfoComponent } from './offer/add-offer/general-info/general-info.component';
import { ProductAssociationComponent } from './offer/add-offer/product-association/product-association.component';
import { DiscountAssociationComponent } from './offer/add-offer/discount-association/discount-association.component';
import { RelevancyRulesComponent } from './offer/add-offer/relevancy-rules/relevancy-rules.component';
import { EligiblityRulesComponent } from './offer/add-offer/eligiblity-rules/eligiblity-rules.component';
import { PricingPinpointComponent } from './offer/add-offer/pricing-pinpoint/pricing-pinpoint.component';
import { EcommPinpointComponent } from './offer/add-offer/ecomm-pinpoint/ecomm-pinpoint.component';
import { OfferFromProjectComponent } from './offer/add-offer/offer-from-project/offer-from-project.component';
import { DialogOverviewExampleDialogInfo, DialogOverviewExampleDialogSuccess } from './offer/add-offer/add-offer.component';
import { ElgibilityRulesComponent } from './offer/add-offer/elgibility-rules/elgibility-rules.component';

import { ConfiguratorService } from './configurator.service';
import { ConfiguratorDataService } from './configurator-data.service';

import { ProductComponent } from './product/product.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { SearchProductComponent } from './product/product-search/search-product/search-product.component';
import { ProductListComponent } from './product/product-search/product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    Ng2PaginationModule,
    Ng2OrderModule,
    SharedModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    AngularMultiSelectModule
  ],
  declarations: [
    OfferComponent,
    OfferBucketGridViewComponent,
    AddOfferComponent,
    ConfiguratorProjectListComponent,
    OfferBucketComponent,
    ReadyToOfferListComponent,
    ProductComponent,
    ProductSearchComponent,
    AddProductComponent,
    SearchProductComponent,
    ProductListComponent,
    // KeysPipe,
    GeneralInfoComponent,
    ProductAssociationComponent,
    DiscountAssociationComponent,
    RelevancyRulesComponent,
    EligiblityRulesComponent,
    PricingPinpointComponent,
    EcommPinpointComponent,
    OfferFromProjectComponent,
    DialogOverviewExampleDialogInfo,
    DialogOverviewExampleDialogSuccess,
    ElgibilityRulesComponent
  ],
  entryComponents: [DialogOverviewExampleDialogInfo, DialogOverviewExampleDialogSuccess],
  providers: [ConfiguratorDataService]
  
})

export class ConfiguratorModule { }

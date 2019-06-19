import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatExpansionModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatDialogModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { SharedModule } from '../../../shared/shared.module';
import { KeysPipe } from '../../configurator/pipes/keys.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { ConfiguratorDiscountRoutingModule } from './configurator-discount-routing.module';

import { DiscountComponent, DialogOverviewExampleDialogComponent, SubmitSuccessDialogComponent, SaveSuccessDialogComponent, ExitFormErrorDialogComponent } from './discount-details/discount.component';
import { DialogOverviewExampleExtractDialogUpdate } from './discount-codes-list/discount-codes-list.component';
import { DiscriptionBuilderComponent } from './discount-details/discription-builder/discription-builder.component';
import { GiftCardComponent } from './discount-details/gift-card/gift-card.component';
import { MappingTableComponent } from './discount-details/mapping-table/mapping-table.component';
import { OscarComponent } from './discount-details/oscar/oscar.component';
import { MainPageComponent } from './discount-details/main-page/main-page.component';
import { OnlineComponent } from './discount-details/online/online.component';
import { CampaignCodeCreationPricingMethodComponent } from './discount-details/campaign-code-creation-pricing-method/campaign-code-creation-pricing-method.component';
import { CampaignCodeCreationPreReqsComponent } from './discount-details/campaign-code-creation-pre-reqs/campaign-code-creation-pre-reqs.component';
import { DiscountGeneralInfoComponent } from './discount-details/discount-general-info/discount-general-info.component';
import { DiscountProjectListComponent } from './discount-project-list/discount-project-list.component';
import { DiscountCodesListComponent } from './discount-codes-list/discount-codes-list.component';
import { DiscountPricingRulesComponent } from './discount-details/discount-pricing-rules/discount-pricing-rules.component';
import { DiscountSitesComponent } from './discount-details/discount-sites/discount-sites.component';

import { ConfiguratorDiscountDataService } from './services/configurator-discount-data.service';
import { IntakeRequestDetailsComponent } from './intake-request-details/intake-request-details.component';
import { IntakeRequestDetailIntakeFormComponent } from './intake-request-details/intake-request-detail-intake-form/intake-request-detail-intake-form.component';
import { IntakeRequestDetailMasterFormComponent } from './intake-request-details/intake-request-detail-master-form/intake-request-detail-master-form.component';
import { RequestorDataService } from '../../requestor/services/requestor-data.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    Ng2PaginationModule,
    Ng2OrderModule,
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule,  
    SharedModule, 
    ConfiguratorDiscountRoutingModule,
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatExpansionModule, 
    MatAutocompleteModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatDialogModule,
    AngularMultiSelectModule
  ],
  declarations: [
    DiscountComponent,
    DiscriptionBuilderComponent,
    GiftCardComponent,
    MappingTableComponent,
    OscarComponent,
    MainPageComponent,
    OnlineComponent,
    CampaignCodeCreationPricingMethodComponent,
    CampaignCodeCreationPreReqsComponent,
    DialogOverviewExampleDialogComponent, SubmitSuccessDialogComponent, SaveSuccessDialogComponent, ExitFormErrorDialogComponent,
    DiscountProjectListComponent,
    DiscountGeneralInfoComponent,
    DiscountCodesListComponent,
    DiscountPricingRulesComponent,
    DiscountSitesComponent,
    DialogOverviewExampleExtractDialogUpdate,
    KeysPipe,
    IntakeRequestDetailsComponent,
    IntakeRequestDetailIntakeFormComponent,
    IntakeRequestDetailMasterFormComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent, SubmitSuccessDialogComponent, SaveSuccessDialogComponent, ExitFormErrorDialogComponent, DialogOverviewExampleExtractDialogUpdate],
  providers: [ConfiguratorDiscountDataService,RequestorDataService]

})
export class ConfiguratorDiscountModule { }

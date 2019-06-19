import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TechnologySystemsRoutingModule } from './technology-systems-routing.module';
import { Ng2PaginationModule } from 'ng2-pagination'; 
import { Ng2OrderModule } from 'ng2-order-pipe';
import { SharedModule } from '../../shared/shared.module';
import { UatComponent } from './uat/uat.component';
import { UatUsersComponent } from './uat/uat-users/uat-users.component';
import { SearchOfferComponent } from './uat/uat-users/search-offer/search-offer.component';
import { OfferGridComponent } from './uat/uat-users/offer-grid/offer-grid.component';
import { IcomsComponent } from './icoms/icoms.component';
import { OfferListGridComponent } from './icoms/offer-list-grid/offer-list-grid.component';
import { OfferDetailInfoComponent } from './icoms/offer-detail-info/offer-detail-info.component';
import { SearchProjectComponent } from './omc/search-project/search-project.component';
import { ProjectListGridComponent } from './omc/project-list-grid/project-list-grid.component';
import { ProjectDetailInfoComponent } from './omc/project-detail-info/project-detail-info.component';
import { PinpointComponent } from './pinpoint/pinpoint.component';
import { EcomComponent } from './ecom/ecom.component';
import { OmcComponent } from './omc/omc.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { DialogOverviewExampleDialogIcomsUpdate } from '../technology-systems/icoms/icoms.component';
import { ECOMProjectDetailInfoComponent } from './ecom/project-detail-info/project-detail-info.component';
import { ECOMProjectListGridComponent } from './ecom/project-list-grid/project-list-grid.component';
import { ECOMSearchProjectComponent } from './ecom/search-project/search-project.component';
import { PinPointProjectDetailInfoComponent } from './pinpoint/project-detail-info/project-detail-info.component';
import { PinPointProjectListGridComponent } from './pinpoint/project-list-grid/project-list-grid.component';
import { PinPointSearchProjectComponent } from './pinpoint/search-project/search-project.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TechnologySystemsRoutingModule,
        MatDatepickerModule,
        MatInputModule,
        Ng2PaginationModule,
        Ng2OrderModule,
        SharedModule
    ],
    declarations: [
        UatComponent,
        UatUsersComponent,
        SearchOfferComponent,
        IcomsComponent,
        OfferGridComponent,
        OfferListGridComponent,
        OfferDetailInfoComponent,
        SearchProjectComponent,
        ProjectListGridComponent,
        ProjectDetailInfoComponent,
        PinpointComponent,
        EcomComponent,
        OmcComponent,
        DialogOverviewExampleDialogIcomsUpdate,
        ECOMProjectDetailInfoComponent,
        ECOMProjectListGridComponent,
        ECOMSearchProjectComponent,
        PinPointProjectDetailInfoComponent,
        PinPointProjectListGridComponent,
        PinPointSearchProjectComponent
    ],
     entryComponents: [DialogOverviewExampleDialogIcomsUpdate]
})
export class TechnologySystemsModule {}

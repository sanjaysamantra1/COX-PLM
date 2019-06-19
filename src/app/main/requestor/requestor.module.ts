import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestorRoutingModule } from './requestor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { KeysPipe } from './pipes/keys.pipe';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ng2PaginationModule } from 'ng2-pagination'; 
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RequestorDataService } from './services/requestor-data.service';
import { SharedModule } from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IntakeRequestListComponent } from './intake-request-list/intake-request-list.component';
import { IntakeRequestDetailsComponent, SubmitSuccessDialog, ExitFormErrorDialog, SaveSuccessDialog } from './intake-request-details/intake-request-details.component';
import { IntakeRequestDetailMasterFormComponent } from './intake-request-details/intake-request-detail-master-form/intake-request-detail-master-form.component';
import { IntakeRequestDetailIntakeFormComponent } from './intake-request-details/intake-request-detail-intake-form/intake-request-detail-intake-form.component';

@NgModule({
    imports: [
        CommonModule,
        RequestorRoutingModule,
        FormsModule,
        AngularMultiSelectModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        Ng2PaginationModule,
        Ng2OrderModule,
        SharedModule,
        MatDialogModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        KeysPipe,
        IntakeRequestListComponent,
        IntakeRequestDetailsComponent,
        IntakeRequestDetailMasterFormComponent,
        IntakeRequestDetailIntakeFormComponent,
        SubmitSuccessDialog, 
        ExitFormErrorDialog, 
        SaveSuccessDialog
    ],
    entryComponents: [SubmitSuccessDialog, ExitFormErrorDialog, SaveSuccessDialog],
    providers: [RequestorDataService]
})
export class RequestorModule {}

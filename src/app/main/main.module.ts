import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatExpansionModule, MatDatepickerModule } from '@angular/material';
import { BlockUIModule } from 'ng-block-ui';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorsComponent } from './dashboard/actors/actors.component';
import { TechnologyActorsComponent } from './dashboard/technology-actors/technology-actors.component';
import { AuthGuardService } from '../shared/guard/auth-guard.service';
import { AuthGuardDataService } from '../shared/guard/auth-guard-data.service';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule.forRoot(),
        SharedModule,
        MatDatepickerModule,
        BlockUIModule
    ],
    declarations: [
        MainComponent,
        SidebarComponent,
        DashboardComponent,
        ActorsComponent,
        TechnologyActorsComponent
    ],
    providers: [
        AuthGuardService,
        AuthGuardDataService
    ]
})
export class MainModule { }

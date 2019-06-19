import { NgModule } from '@angular/core';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'rxjs/Rx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule} from '@angular/material';

import {HttpModule} from '@angular/http';

import { BlockUIModule } from 'ng-block-ui';
import { SharedModule } from './shared/shared.module';

import { PLMRoutingModule } from './plm-routing.module';
import { PLMComponent } from './plm.component';
import { GlobalHttpInterceptor } from './shared/guard/global-http-interceptor';
import { AuthGuard } from './shared';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { AuthGuardDataService } from './shared/guard/auth-guard-data.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '', '.json');
    return new TranslateHttpLoader(http, '', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        NgbDropdownModule,
        HttpModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        //BlockUIModule.angular-in-memory-web-apio(),
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        PLMRoutingModule
    ],
    declarations: [
        PLMComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        AuthGuard, 
        HttpClientModule, 
        AuthGuardService,
        AuthGuardDataService,
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: GlobalHttpInterceptor, 
            multi: true 
        } 
    ],
    bootstrap: [PLMComponent]
})
export class PLMModule {}

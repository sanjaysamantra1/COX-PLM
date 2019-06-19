import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { HelpComponent } from './components/help/help.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HttpUtilityService } from './services/http-utility.service';

import { AppConfigService } from './services/app-config.service';
import { sharedListPipe } from './pipes/shared-filter.pipe';
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthGuardDataService } from './guard/auth-guard-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    HelpComponent,
    BreadcrumbComponent,
    sharedListPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    sharedListPipe
  ],
  providers: [
    AppConfigService,
    HttpUtilityService,
    AuthGuardService,
    AuthGuardDataService
  ]
})
export class SharedModule { }

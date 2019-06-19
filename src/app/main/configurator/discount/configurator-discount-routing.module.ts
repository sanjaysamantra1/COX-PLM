import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared';
import { DiscountComponent } from './discount-details/discount.component';
import { DiscountProjectListComponent } from './discount-project-list/discount-project-list.component';
import { DiscountCodesListComponent } from './discount-codes-list/discount-codes-list.component';
import { IntakeRequestDetailsComponent }  from '../../configurator/discount/intake-request-details/intake-request-details.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'project-list', 
    pathMatch: 'full' 
  },
  { 
    path: 'project-list', 
    component: DiscountProjectListComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/project-list'}  
  },
  { 
    path: 'discount-code-list', 
    component: DiscountCodesListComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/discount-code-list'}  
  },
  { 
    path: 'intake-request', 
    component: IntakeRequestDetailsComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/intake-request'}  
  },
  { 
    path: 'add-discount', 
    component: DiscountComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/add-discount'}  
  },
  { 
    path: 'edit-discount', 
    component: DiscountComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/edit-discount'}  
  },
  { 
    path: 'view-discount', 
    component: DiscountComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/configurator/discount/view-discount'}  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfiguratorDiscountRoutingModule { }
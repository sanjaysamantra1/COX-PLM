import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntakeRequestListComponent } from './intake-request-list/intake-request-list.component';
import { IntakeRequestDetailsComponent } from './intake-request-details/intake-request-details.component';
import { AuthGuard } from '../../shared/guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'intake-request-list', 
    pathMatch: 'full' 
  },
  { 
    path: 'intake-request-list', 
    component: IntakeRequestListComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/requestor/intake-request-list'}  
  },
  { 
    path: 'add-intake-request', 
    component: IntakeRequestDetailsComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/requestor/add-intake-request'}  
  },
  { 
    path: 'edit-intake-request', 
    component: IntakeRequestDetailsComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/requestor/edit-intake-request'}  
  },
  { 
    path: 'view-intake-request', 
    component: IntakeRequestDetailsComponent, 
    canActivate: [AuthGuard],
    data: { path : 'plm-work-flow/requestor/view-intake-request'}  
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './../shared';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'plm-work-flow/requestor',
                loadChildren: './requestor/requestor.module#RequestorModule', 
                canActivate: [AuthGuard],
                data: { path : 'plm-work-flow/requestor'}
            },
            { 
                path: 'plm-work-flow/configurator', 
                loadChildren: './configurator/configurator.module#ConfiguratorModule', 
                canActivate: [AuthGuard],
                data: { path : 'plm-work-flow/configurator'}
            },
            { 
                path: 'plm-work-flow/distributor', 
                loadChildren: './distributor/distributor.module#DistributorModule', 
                canActivate: [AuthGuard],
                data: { path : 'plm-work-flow/distributor'} 
            },
            { 
                path: 'plm-work-flow/technology-systems', 
                loadChildren: './technology-systems/technology-systems.module#TechnologySystemsModule', 
                canActivate: [AuthGuard],
                data: { path : 'plm-work-flow/technology-systems'}  
            },
            { 
                path: 'report', 
                loadChildren: './report/report.module#ReportModule', 
                canActivate: [AuthGuard],
                data: { path : 'report'}
            },
            { 
                path: 'user-admin', 
                loadChildren: './user-admin/user-admin.module#UserAdminModule', 
                canActivate: [AuthGuard],
                data: { path : 'user-admin'} 
            },
            { 
                path: 'business-catalog', 
                loadChildren: './business-catalog/business-catalog.module#BusinessCatalogModule', 
                canActivate: [AuthGuard],
                data: { path : 'business-catalog'} 
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

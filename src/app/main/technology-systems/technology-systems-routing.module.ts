import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UatComponent } from './uat/uat.component';
import { IcomsComponent } from './icoms/icoms.component';
import { OmcComponent } from './omc/omc.component';
import { PinpointComponent } from './pinpoint/pinpoint.component';
import { EcomComponent } from './ecom/ecom.component';

const routes: Routes = [
    { path: 'omc-uat-users', component: UatComponent },
    { path: 'icoms', component: IcomsComponent },
    { path: 'omc', component: OmcComponent },
    { path: 'pin-point', component: PinpointComponent },
    { path: 'e-com', component: EcomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologySystemsRoutingModule { }

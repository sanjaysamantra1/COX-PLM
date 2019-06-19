import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared';
import { OfferComponent } from './offer/offer.component';
import { ConfiguratorProjectListComponent } from './offer/configurator-project-list/configurator-project-list.component';
import { OfferBucketGridViewComponent } from './offer/offer-bucket-grid-view/offer-bucket-grid-view.component';
import { AddOfferComponent } from './offer/add-offer/add-offer.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    { path: 'offer/project-list', component: ConfiguratorProjectListComponent },
    { path: 'offer/offer-table', component: OfferBucketGridViewComponent },
    { path: 'offer/add-offer', component: AddOfferComponent },
    // { path: 'discount', component: DiscountComponent },
    { 
      path: 'discount', 
      loadChildren: './discount/configurator-discount.module#ConfiguratorDiscountModule', 
      canActivate: [AuthGuard],
      data: { path : 'plm-work-flow/configurator/discount'}
    },
    { path: 'product', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }

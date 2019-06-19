import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'offers', component: OffersComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessCatalogRoutingModule { }

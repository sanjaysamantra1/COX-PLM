import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountComponent } from './discount/discount.component';
import { OmcProdComponent } from './omc-prod/omc-prod.component';
import { OmcTestComponent } from './omc-test/omc-test.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    { path: 'discount', component: DiscountComponent },
    { path: 'omc-prod', component: OmcProdComponent },
    { path: 'omc-test', component: OmcTestComponent },
    { path: 'product', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCatalogRoutingModule } from './business-catalog-routing.module';
import { BusinessCatalogComponent } from './business-catalog.component';
import { OffersComponent } from './offers/offers.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    CommonModule,
    BusinessCatalogRoutingModule
  ],
  declarations: [BusinessCatalogComponent, OffersComponent, DiscountsComponent, ProductsComponent]
})
export class BusinessCatalogModule { }

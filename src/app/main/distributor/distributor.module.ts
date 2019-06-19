import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorRoutingModule } from './distributor-routing.module';
import { OmcTestComponent } from './omc-test/omc-test.component';
import { OmcProdComponent } from './omc-prod/omc-prod.component';
import { ProductComponent } from './product/product.component';
import { DiscountComponent } from './discount/discount.component';
import { MessagePanelComponent } from './omc-test/omc-test-queue/message-panel/message-panel.component';
import { TestQueueOfferComponent } from './omc-test/omc-test-queue/test-queue-offer/test-queue-offer.component';
import { ProdQueueOfferComponent } from './omc-prod/omc-prod-queue/prod-queue-offer/prod-queue-offer.component';
import { OmcProdQueueComponent } from './omc-prod/omc-prod-queue/omc-prod-queue.component';
import { MessagePanel1Component } from './omc-prod/omc-prod-queue/message-panel/message-panel.component';
import { OmcTestQueueComponent } from './omc-test/omc-test-queue/omc-test-queue.component';

@NgModule({
  imports: [
    CommonModule,
    DistributorRoutingModule
  ],
  declarations: [
    OmcTestComponent,
    OmcProdComponent,
    ProductComponent,
    DiscountComponent,
    MessagePanelComponent,
    TestQueueOfferComponent,
    ProdQueueOfferComponent,
    OmcProdQueueComponent,
    MessagePanel1Component,
    OmcTestQueueComponent
  ]
})
export class DistributorModule { }

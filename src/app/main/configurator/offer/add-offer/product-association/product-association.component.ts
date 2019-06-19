import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { OfferFormDropDown, ProductAssoResponse, Products, OfferProdMapTxnDets, OfferCreationResponse } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';
import { ConfiguratorDataService } from '../../../configurator-data.service';

@Component({
  selector: 'plm-product-association',
  templateUrl: './product-association.component.html'
})
export class ProductAssociationComponent implements OnInit, OnChanges {

  @Input() offerFormDropDown: OfferFormDropDown;
  @Input() offerProductAssInfo: OfferProdMapTxnDets[];
  
  private selectedProduct: Products;
  private productList: string[];
  private productAssociate: Products[];
  private currentProduct: string;
  private myControl: FormControl;
  private filteredOptions2: Observable<string[]>;
  private isProductExists: Boolean;
  private products: Products[];

  constructor(private configuratorDataService: ConfiguratorDataService) {
    this.productList = [];
    this.productAssociate = [];
    this.currentProduct = '';
    this.myControl = new FormControl();
    this.isProductExists = false;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName === 'offerFormDropDown') {
          this.products = ((typeof change.currentValue != 'undefined') && (typeof change.currentValue.PRODUCTS != 'undefined')) ? (JSON.parse(JSON.stringify(change.currentValue.PRODUCTS))) : [];
          this.updateProductList(this.products);
          this.filteredOptions2 = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(val => this.filter2(val))
            );
      } else if (propName === 'offerProductAssInfo') {
          this.offerProductAssInfo =  (typeof change.currentValue != 'undefined') ? (JSON.parse(JSON.stringify(change.currentValue))) : {};
          for (let i=0; i<this.offerProductAssInfo.length; i++) {
            this.onSelectProduct(this.offerProductAssInfo[i].name);
          }
      }
    }
  }

  filter2(value: string): string[] {
    return this.productList.filter(option1 =>
      option1.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  updateProductList(offerProducts){
    for(let i=0; i<offerProducts.length; i++) {
      this.productList.push(offerProducts[i].name);
    }
    this.updateSubmitData();
  }

  onSelectProduct(product){
    let selectedProduct: any;
    if (this.productAlreadyAdded(product)) {
      this.isProductExists = true;
      return false;
    }
    for(let i=0; i<this.products.length; i++) {
      if (product === this.products[i].name) {
        selectedProduct = this.products[i];
        break;
      }
    }
    if (typeof selectedProduct !== 'undefined') {
      this.selectedProduct = selectedProduct; 
      this.productAssociate.push(this.selectedProduct);
    }
    this.updateSubmitData();
  }

  productAlreadyAdded(product) {
    let result = false;
    for(let i=0; i<this.productAssociate.length; i++) {
      if (product === this.productAssociate[i].name) {
        result = true;
        break;
      }
    }
    return result;
  }

  /** Display function for selected autocomplete values. */
  displayNull(value) {
    return null;
  }

  removeProduct(index){
    this.productAssociate.splice(index, 1);
    this.updateSubmitData();
  }

  updateSubmitData() {
    this.configuratorDataService.configuratorOfferModel.offerModel.offerProdMapTxnDets = [];
    for (let i=0; i < this.productAssociate.length; i++) {
      this.configuratorDataService.configuratorOfferModel.offerModel.offerProdMapTxnDets.push({
        'prodId': this.productAssociate[i].prodId,
				'offrPrdMapId': null,
				'name': this.productAssociate[i].name,
				'catagory': this.productAssociate[i].category,
				'psu': this.productAssociate[i].psu,
				'icomsCode':this.productAssociate[i].icomsCd
      });
    }
  }

}

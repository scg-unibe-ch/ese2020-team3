import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.css']
})
export class ShopCatalogueComponent implements OnInit {

  loggedIn = false;
  userIsAdmin = false;
  userToken = '';
  userName = '';
  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  updateProducts(): void {

  }
  
  removeProduct(product: Product): void {
    
    this.updateProducts();
  }

  addProductToChart(product: Product): void {
    
    this.updateProducts();
  }
}

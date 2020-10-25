import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.css']
})
export class ShopCatalogueComponent implements OnInit {

  products = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    //TODO
  }

  buyProduct(product: Product) {

  }

}

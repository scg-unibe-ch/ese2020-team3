import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { SellProductsComponent } from './sell-products/sell-products.component';
import { ShoppingChartComponent } from './shopping-chart/shopping-chart.component';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit {

  loggedIn = false;
  userName = '';
  userToken = '';

  @ViewChild(ProductsCatalogComponent) catalogue: ProductsCatalogComponent;
  @ViewChild(ShoppingChartComponent) chart: ShoppingChartComponent;
  @ViewChild(SellProductsComponent) sellProducts: SellProductsComponent;

  constructor() {}

  ngOnInit(): void {
  }

  update() : void {
    this.userToken = localStorage.getItem("userToken");
    this.userName = localStorage.getItem("userName");
    this.loggedIn = !!(this.userToken);
  }
}

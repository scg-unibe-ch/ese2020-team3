import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductShopComponent } from '../product-shop.component';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {

  @Input() shop: ProductShopComponent;

  loggedIn = false;
  userIsAdmin = false;
  userToken = '';
  userName = '';
  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
    this.userIsAdmin = false;
    this.updateProducts();
  }

  updateProducts(): void {
    //LOAD CATALOGUE PRODUCTS FROM BACKEND
  }
  
  removeProduct(product: Product): void {
    //UPDATE BACKEND
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
        this.products.splice(index, 1);
    }
  }

  addProductToChart(product: Product): void {
    this.shop.chart.addProduct(product);
  }
}

import { Component, OnInit } from '@angular/core';
import {ProductList} from '../models/product-list.model'
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit {

  products = new ProductList([]);
  chart: Product[] = [];

  loggedIn = false;
  userName = '';
  userToken = '';

  totalCosts = 0;

  constructor() {}

  ngOnInit(): void {
    this.update();
  }

  update() : void {
    this.totalCosts = 0;
    this.chart.forEach(product => {
      this.totalCosts += product.price;
    });

    this.userToken = localStorage.getItem("userToken");
    this.userName = localStorage.getItem("userName");
    this.loggedIn = !!(this.userToken)
  }

  addProductToList(name: string, description: string, price: number) :void {
    this.products.addProduct(new Product(0, this.userToken, this.userName, name, description, price, false));
    this.update();
  }

  removeProductFromList(product: Product) : void {
    this.products.removeProduct(product);
    this.update();
  }

  addProductToChart(product: Product) : void {
    this.chart.push(product);
    product.bought = true;
    this.update();
  }

  removeProductFromChart(product: Product) : void {
    const index = this.chart.indexOf(product, 0);
        if (index > -1)
            this.chart.splice(index, 1);
    this.update();
  }
}

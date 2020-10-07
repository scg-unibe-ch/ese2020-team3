import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductShopComponent } from '../product-shop.component';

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css']
})
export class ShoppingChartComponent implements OnInit {

  @Input() shop: ProductShopComponent;

  loggedIn = false;
  userToken = '';
  userName = '';
  userPoints = 0;
  products: Product[] = [];
  costs = 0;

  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.costs = 0;
    this.products.forEach(product => {
      this.costs += product.price;
      product.inChart = true;
    });
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.userPoints = 0;
    this.loggedIn = !!(this.userToken);
    this.updateChart();
  }

  updateChart() {
    //LOAD FROM BACKEND
  }

  addProduct(product: Product) : void {
    this.products.push(product);
    this.update();
  }

  removeProduct(product: Product) : void {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
        this.products.splice(index, 1);
        product.inChart = false;
        this.update();
    }
  }

  buyProducts() : void {
    window.alert('Bought Products');

    //ENOUGH POINTS?

    //TRANSFER MONEY
    
    //REMOVE PRODUCTS FROM DATABASE

    this.products.forEach(product => {
      this.shop.catalogue.removeProduct(product);
    });
    this.products = [];
    this.update();
  }
}

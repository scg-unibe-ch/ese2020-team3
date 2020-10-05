import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css']
})
export class ShoppingChartComponent implements OnInit {

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
      product.bought = true;
      this.costs += product.price;
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
        this.update();
    }
  }

  buyProducts() : void {
    window.alert('Bought Products');

    //ENOUGH POINTS?

    //TRANSFER MONEY
    
    //REMOVE PRODUCTS FROM DATABASE

    this.products = [];
    this.update();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

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
  }

  updateProducts() {

  }

  addProduct(product: Product) : void {
    
    this.updateProducts();
  }

  removeProduct(product: Product) : void {
    
    this.updateProducts();
  }

  buyProducts() : void {

    this.updateProducts();
  }
}

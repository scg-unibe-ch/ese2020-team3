import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {

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
    //LOAD FROM BACKEND
  }

  removeProduct(product: Product): void {
    //UPDATE BACKEND
  }

  addProductToChart(product: Product): void {
    //product.bought = true;
    //UPDATE BACKEND
  }
}

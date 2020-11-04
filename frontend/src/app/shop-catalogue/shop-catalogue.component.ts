import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.css']
})

export class ShopCatalogueComponent implements OnInit {

  products = [];

  loggedIn: boolean = false;
  userId: number = 0;
  userWallet: number = 0;
  userToken: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.update();
  }

  //Load all products that are authorized and available from the backend (Exclude the ones from the logged in user)
  loadProducts() {
    this.products = [];
    this.httpClient.get(environment.endpointURL + 'products/authorized/yes').subscribe((data: any) => {
      data.forEach(product => {
        if (product.status == 'available' && product.userId != this.userId) {
          this.products.push(product);
          console.log(product);
        }
      });
    }, (error: any) => {
      window.alert("An Error occurred. The catalogue could not be loaded.");
    });
  }

  //Update the information for the component
  update() {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.userWallet = parseInt(localStorage.getItem('userWallet'));
    this.userToken = localStorage.getItem('userToken');
    this.loggedIn = !!(this.userToken);
    this.loadProducts();
  }

  buyProduct(product: Product) {
    if (this.loginStillValid()) {
      if (this.userHasEnoughMoney(this.userId, product.price)){

      }
    } else {
      window.alert("An Error occured. Please refresh the page!");
    }
  }

  //Returns whether the same person that loaded the page is logged in
  loginStillValid():boolean {
    return this.loggedIn && !!(localStorage.getItem('userToken'))  && this.userId == parseInt(localStorage.getItem('userId'));
  }

  userHasEnoughMoney(userId: number, money: number):boolean {
    this.httpClient.get(environment.endpointURL + 'user').subscribe((data: any) => {
      console.log(data)
    }, (error: any) => {
      window.alert("Unauthorized");
    });
    return false;
  }
}

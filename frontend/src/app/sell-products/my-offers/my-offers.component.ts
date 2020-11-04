import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  products = [];
  changingProduct = this.dummyProduct();

  loggedIn = false;
  userId = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.update();
  }

  dummyProduct():Product {
    return new Product(-1, '', '', '', -1, false, '', 0, '', false, '');
  }

  update() {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.loggedIn = !!(localStorage.getItem('userToken'));
    this.loadMyProducts();
    this.changingProduct = this.dummyProduct();
  }

  loadMyProducts() {
    this.products = [];
    if (this.loggedIn) {
      this.httpClient.get(environment.endpointURL + 'products/all/' + this.userId).subscribe((data: any) => {
        data.forEach(product => {
            this.products.push(product);
            console.log(product);
        });
      }, (error: any) => {
        window.alert("An Error occurred. The catalogue could not be loaded.");
      });
    }
  }

  changeProduct(product: Product) {
    this.changingProduct = {...product};
  }

  saveChange() {
    if (this.changingProduct.productId != -1) {
      const product = this.changingProduct;
      this.httpClient.put(environment.endpointURL + 'products/' + product.productId, {
        title: product.title,
        description: product.description,
        price: product.price,
        location: product.location,
        status: "unauthorized",
        authorized: "no"

      }).subscribe();
      this.update();
    }
  }

  discardChange() {
    this.changingProduct = this.dummyProduct();
  }

}

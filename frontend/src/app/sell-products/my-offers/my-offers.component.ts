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
  paginatedProducts = [];
  changingProduct = this.dummyProduct();
  displayedColumns = ['title', 'description', 'location', 'lend', 'price', 'deliverable', 'status', 'edit'];
  recordSizes = [5, 10, 20]; //Possible results per page
  defaultRecords = 5; //Default records per page
  totalRecords = 0; //Total amount
  pageEvent: any;

  loggedIn = false;
  userId = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.update();
  }

  onPaginateChange(data) {
    const begin = data.pageIndex * data.pageSize;
    const end = begin + data.pageSize;
    this.paginatedProducts = this.products.slice(begin, end);
  }

  dummyProduct():Product {
    return new Product(-1, '', '', '', -1, 'sell', '', 0, '', false, '');
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
      this.httpClient.get(environment.endpointURL + 'products/all/' + this.userId).subscribe((products: any) => {
        products.forEach(product => {
            this.products.push(product);
        });
        this.paginatedProducts = this.products.slice(0, this.defaultRecords);
        this.totalRecords = this.products.length;
      }, (error: any) => {
        window.alert("An Error occurred. The catalogue could not be loaded.");
      });
    }
  }

  editProduct(product: Product) {
    this.changingProduct = {...product};
  }

  saveChange() {
    if (this.changingProduct.productId != -1 && this.changesAreValid()) {
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

  changesAreValid(): boolean {
    return this.changingProduct.price > 0
          && this.changingProduct != null
          && this.changingProduct.title != ''
          && this.changingProduct.location != ''
          && this.changingProduct.description != '';
  }

  discardChange() {
    this.changingProduct = this.dummyProduct();
  }

}

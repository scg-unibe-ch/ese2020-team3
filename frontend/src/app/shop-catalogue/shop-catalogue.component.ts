import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.css']
})

export class ShopCatalogueComponent implements OnInit {

  products:Product[] = [];
  filteredProducts = [];
  recordSizes = [5, 10, 20]; //Possible results per page
  defaultRecords = 5; //Default records per page
  totalRecords = 0; //Total amount
  pageEvent: any;
  displayedColumns = ['title', 'description', 'location', 'price', 'deliverable', 'buy'];

  loggedIn: boolean = false;
  userId: number = 0;
  userWallet: number = 0;
  userToken: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.update();
  }

  onPaginateChange(data) {
    const begin = data.pageIndex * data.pageSize;
    const end = begin + data.pageSize;
    this.filteredProducts = this.products.slice(begin, end);
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

      this.filteredProducts = this.products.slice(0, this.defaultRecords);
      this.totalRecords = this.products.length;

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

  //TODO - Buy
  buyProduct(product: Product) {
    if (this.loginStillValid()) {
    } else {
      window.alert("An Error occured. Please refresh the page!");
    }
  }

  //Returns whether the same person that loaded the page is logged in
  loginStillValid():boolean {
    return this.loggedIn && !!(localStorage.getItem('userToken'))  && this.userId == parseInt(localStorage.getItem('userId'));
  }


}

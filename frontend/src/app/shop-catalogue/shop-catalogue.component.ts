import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {ProductPipe} from '../product-pipe.pipe';
import {ProductFilter} from '../models/product-filter.model';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.css'],
  providers: [ProductPipe]
})

export class ShopCatalogueComponent implements OnInit {

  products:Product[] = [];
  paginatedProducts = [];
  filteredProducts = [];
  productFilter: ProductFilter = this.defaultProductFilter();
  recordSizes = [5, 10, 20]; //Possible results per page
  defaultRecords = 5; //Default records per page
  totalRecords = 0; //Total amount
  pageEvent: any;
  displayedColumns = ['title', 'description', 'location', 'lend', 'price', 'deliverable', 'buy'];

  loggedIn: boolean = false;
  userId: number = 0;
  userWallet: number = 0;
  userToken: string = '';

  constructor(private httpClient: HttpClient, private pipe: ProductPipe) { }

  ngOnInit(): void {
    this.update();
  }

  //Executed when changing the page of the paginator or changing the number of results on 1 page
  onPaginateChange(data) {
    const begin = data.pageIndex * data.pageSize;
    const end = begin + data.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(begin, end);
  }

  /**
   * Provides a defaulr product Filter for the ProductPipe to work with.
   */
  defaultProductFilter() {
    return new ProductFilter('', '', '', '', 0, Number.MAX_VALUE, true, false);
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

      this.updateFilteredProducts();
      this.updatePaginatedProducts();

    }, (error: any) => {
      window.alert("An Error occurred. The catalogue could not be loaded.");
    });
  }

  /**
   * TODO: Updates the filtered products based on the conditions of the filter
   * (like title, price range etc.)
   */
  updateFilteredProducts() {
    this.filteredProducts = this.pipe.transform(this.products, this.productFilter);//this.products;
    this.totalRecords = this.filteredProducts.length;
  }

  /**
   * Slices the array of filtered products so the paginated products array
   * will just be the products actually displayed on the current page.
   */
  updatePaginatedProducts() {
    this.paginatedProducts = this.filteredProducts.slice(0, this.defaultRecords);
  }

  /**
   * Update the information for the component. Calls all imprtant methods.
   */
  update() {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.userWallet = parseInt(localStorage.getItem('userWallet'));
    this.userToken = localStorage.getItem('userToken');
    this.loggedIn = !!(this.userToken);
    this.loadProducts();
  }

  /**
   * Invoked when clicking on the search button
   */
  searchForProducts() {
    this.updateFilteredProducts();
    this.updatePaginatedProducts();
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

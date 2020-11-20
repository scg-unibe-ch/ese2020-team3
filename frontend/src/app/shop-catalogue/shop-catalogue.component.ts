import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {ProductPipe} from '../product-pipe.pipe';
import {ProductFilter} from '../models/product-filter.model';
import { Router } from '@angular/router';

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
  displayedColumns = ['title', 'description', 'location', 'lend', 'price', 'deliverable', 'show'];

  loggedIn: boolean = false;
  userId: number = 0;
  userWallet: number = 0;
  userToken: string = '';

  constructor(private httpClient: HttpClient, private pipe: ProductPipe, private router: Router) {
  }

  ngOnInit(): void {
    this.update();
  }

  /**
   * Filters the products based on the TEMP_PRODUCT_SEARCH_TERM in localstorage (if it exists).
   * This value is set from the welcom pages searchbar and is deleted here.
   */
  searchFromWelcomePage() {
    let searchTerm = localStorage.getItem("TEMP_PRODUCT_SEARCH_TERM");
    if (!!searchTerm) {
      this.filteredProducts = this.products.filter((product) => 
        product.title.includes(searchTerm)
        || product.location.includes(searchTerm)
        || product.description.includes(searchTerm)
      );
      this.totalRecords = this.filteredProducts.length;
      this.updatePaginatedProducts();
    
      localStorage.removeItem("TEMP_PRODUCT_SEARCH_TERM");
    }
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
    return new ProductFilter('', '', '', '', null, null, '');
  }

  //Load all products that are authorized and available from the backend (Exclude the ones from the logged in user)
  loadProducts() {
    this.products = [];
    this.httpClient.get(environment.endpointURL + 'products/authorized/yes').subscribe((data: any) => {
      data.forEach(product => {
        if (product.status == 'available' && product.userId != this.userId) {
          this.products.push(product);
        }
      });

      this.updateFilteredProducts();
      this.updatePaginatedProducts();
      this.searchFromWelcomePage();

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

  //Show product
  showProduct(product: Product) {
    this.router.navigateByUrl(`/Shop/${product.productId}`);
  }
}

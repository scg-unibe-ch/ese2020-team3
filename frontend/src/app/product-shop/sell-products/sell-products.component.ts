import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductShopComponent } from '../product-shop.component';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

  @Input() shop: ProductShopComponent;

  loggedIn = false;
  userToken = '';
  userName = '';

  productName = '';
  productDescription = '';
  productPrice = 0;

  constructor() { }

  ngOnInit(): void {
    this.update();
    this.resetAttributes();
  }

  resetAttributes(){
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 1;
  }

  update() {
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }

  submitProduct() {

    //Product to submit
    var product = new Product(this.userToken, this.userName, this.productName, this.productDescription, this.productPrice, false);
    
    //TODO: STORE PRODUCT IN BACKEND CATALOGUE

    //Reset form fields and give feedback
    this.resetAttributes();
    window.alert('Your Product has been submitted!');

    //Add product to catalogue
    this.shop.catalogue.products.push(product);
  }
}

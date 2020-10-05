import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

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

  confirmProduct(e) {
    if(!confirm('Are you sure?')) {
      e.preventDefault();
    }
  }

  submitProduct() {

    //STORE PRODUCT WITH CONFIRMED=FALSE

    this.resetAttributes();
    window.alert('Your Product has been submitted!');
  }
}

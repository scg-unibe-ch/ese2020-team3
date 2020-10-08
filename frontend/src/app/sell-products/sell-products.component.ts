import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

  loggedIn = false;
  userToken = '';
  userName = '';

  title: string;
  type: string;
  rent: boolean;
  description: string;
  price: number;

  constructor() { }

  ngOnInit(): void {
    this.update();
    this.resetAttributes();
  }

  resetAttributes(){
    this.title = '';
    this.type = 'Product';
    this.rent = false;
    this.description = '';
    this.price = 0;
  }

  update() {
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }

  submitProduct() {
    
    this.resetAttributes();
    window.alert('Your Product has been submitted!');
  }
}

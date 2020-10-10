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
  location: string;
  rent: boolean;
  description: string;
  price: number;

  constructor() { }

  ngOnInit(): void {
    this.resetAttributes();
  }

  resetAttributes(){
    this.title = '';
    this.type = 'Product';
    this.location = '';
    this.rent = false;
    this.description = '';
    this.price = 0;
  }

  submitProduct() {

    if (!this.settingsAreValid()){
      window.alert("Make sure you provide title, description, rent, location and a positive price!")
    } else {

      //TODO
      
      this.resetAttributes();
      window.alert('Your '+this.type+' has been submitted!');
    }
  }

  settingsAreValid(): boolean {
    return !!(this.title)
          && !!(this.type)
          && !!(this.location)
          && !!(this.description)
          && this.price > 0
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

  loggedIn = false;
  userToken = '';
  userName = '';

  product: Product;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.resetAttributes();
  }

  resetAttributes(){
    this.product = new Product('', 'Product', '', parseInt(localStorage.getItem('userId')), false, '', 0, 'submitted', false, 'no');
  }

  submitProduct() {

    if (!this.settingsAreValid()){
      window.alert("Make sure you provide title, description, rent, location and a positive price!")
    } else {

      this.product.userId = parseInt(localStorage.getItem('userId'));
      this.httpClient.post(environment.endpointURL + 'products', {
        title: this.product.title,
        description: this.product.description,
        location: this.product.location,
        type: this.product.type,
        price: this.product.price,
        sell_lend: this.product.rent? 'lend' : 'sell',
        userId: this.product.userId,
        status: 'unauthorized',
        authorized: 'no'
      }).subscribe((product: any) => {
      });
      
      window.alert('Your '+this.product.type+' has been submitted!');
      this.resetAttributes();
    }
  }

  settingsAreValid(): boolean {
    return !!(this.product.title)
          && !!(this.product.type)
          && !!(this.product.location)
          && !!(this.product.description)
          && this.product.userId >= 0
          && this.product.price > 0
          && this.product.userId == parseInt(localStorage.getItem('userId'));
  }
}

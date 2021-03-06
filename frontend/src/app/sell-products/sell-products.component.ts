import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ɵWebAnimationsDriver } from '@angular/animations/browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css']
})
export class SellProductsComponent implements OnInit {

  offering = false;
  successfulOffer = false;
  loggedIn = false;
  userToken = '';
  userName = '';

  product: Product;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetAttributes();
  }

  //Resets the product's attributes to their default values
  resetAttributes(){
    this.product = new Product(
      0,                                        //Product Id (Will be set in the backend as primary key)
      '',                                       //Title
      'Product',                                //Type
      '',                                       //Description
      parseInt(localStorage.getItem('userId')), //UserId
      'sell',                                    //lend or sell
      '',                                       //Location
      0,                                        //Price
      'unauthorized',                           //Status
      false,                                    //Deliverable
      'no'                                      //Authorized (Approved by admin)
    );
  }

  //Posts a new Product to the backend if the attributes are valid
  submitProduct() {

    if (!this.settingsAreValid()){
      window.alert("Make sure you provide title, description, location and a positive price!")
    } else {

      this.product.userId = parseInt(localStorage.getItem('userId'));

      this.httpClient.post(environment.endpointURL + 'products/post', {
        title: this.product.title,
        description: this.product.description,
        location: this.product.location,
        type: this.product.type,
        price: this.product.price,
        sell_lend: this.product.sell_lend,
        deliverable: this.product.deliverable,
        userId: this.product.userId,
        status: this.product.status,
        authorized: this.product.authorized
      }).subscribe((product: any) => {
        this.product.userId = product.userId;
        this.offering = false;
        this.successfulOffer = true;
      }), (error: any) => {
        window.alert("An Error occured. Your Product was not sent!")
      };
      this.resetAttributes();
    }
  }

  /**The settings are valid if
   * a title is provided
   * a location is provided
   * a description is provided
   * someone is logged in
   * the logged in user is the same that loaded the page
   * the price is greater that zero
   * */
  settingsAreValid(): boolean {
    return !!(this.product.title)
          && !!(this.product.type)
          && !!(this.product.location)
          && !!(this.product.description)
          && !!(localStorage.getItem('userToken'))
          && this.product.price > 0
          && this.product.userId == parseInt(localStorage.getItem('userId'));
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  products = [];

  loggedIn = false;
  userId = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.loggedIn = !!(localStorage.getItem('userToken'));
    this.loadMyProducts();
  }

  loadMyProducts() {
    this.products = [];
    if (this.loggedIn) {
      this.httpClient.get(environment.endpointURL + 'products/all/' + this.userId).subscribe((data: any) => {
        data.forEach(product => {
            this.products.push(product);
            console.log(product);
        });
      }, (error: any) => {
        window.alert("An Error occurred. The catalogue could not be loaded.");
      });
    }
  }

}

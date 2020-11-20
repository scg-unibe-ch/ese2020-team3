import { HttpClient } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  product: Product;
  seller: User;
  loggedIn: boolean;
  bought: boolean;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.bought = false;
    this.loggedIn = !!(localStorage.getItem('userToken'));
    this.product = new Product(-1, '', '', '', -1, '', '', 0, '', false, '');

    //Get the product id based on the route
    this.sub = this.route.params.subscribe(params => {
        this.id = +params['productId'];
    });

    //Get the product to display
    this.httpClient.get(environment.endpointURL + `products/${this.id}`).subscribe((product: any) => {
      this.product = product;

      if (product.status !== 'available') {
        this.announceError("Product is no longer available!");
      }
    }, (error: any) => {
      this.announceError("Product could not be found!")
    });
  }

  //Show error message and return to shop (Might happen when user manually types in route <- BAD user)
  announceError(message: string) {
    window.alert(`Error: ${message}`);
    this.goToShop();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToShop() {
    this.router.navigateByUrl('/Shop');
  }

  buyProduct() {
    if (this.userHasEnoughMoney()) {
      let buyerId = parseInt(localStorage.getItem('userId'));

      this.httpClient.put(environment.endpointURL + `user/sell/${this.product.price}`, {
        userId: this.product.userId
      }).subscribe((seller: any) => {
      });

      this.httpClient.put(environment.endpointURL + `user/buy/${this.product.price}`, {
        userId: buyerId
      }).subscribe((buyer: any) => {
        //Update wallet of current user
        localStorage.setItem('userWallet', buyer.wallet);
      });

      this.httpClient.put(environment.endpointURL + `products/buy/${this.product.productId}`, {
        userId: buyerId
      }).subscribe((soldProduct: any) => {
        this.bought = true;
      });
    } else {
      this.announceError("You don't have enough money!")
    }
  }

  userHasEnoughMoney() {
    return !!(localStorage.getItem('userWallet'))
      && (parseInt(localStorage.getItem('userWallet')) >= this.product.price);
  }
}

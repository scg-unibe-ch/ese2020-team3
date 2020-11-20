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

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
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

  //Show error message and return to shop
  announceError(message: string) {
    window.alert(`Error: ${message}`);
    this.router.navigateByUrl('/Shop');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buyProduct() {
    //TODO
  }
}

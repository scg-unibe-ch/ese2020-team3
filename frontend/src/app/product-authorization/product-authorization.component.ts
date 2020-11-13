import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-authorization',
  templateUrl: './product-authorization.component.html',
  styleUrls: ['./product-authorization.component.css']
})
export class ProductAuthorizationComponent implements OnInit {

  isAdmin: boolean;

  products: Product[];

  displayedColumns: string[] = ['title', 'location', 'delivarable', 'description', 'price', 'acceptorreject'];


  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void {

    this.updateProducts()
  }

  updateProducts(){
    return this.httpClient.get(environment.endpointURL + 'products/authorized/no').subscribe((res: any) =>
    {
      console.log(res);
      this.products = res;
    })
  }

  authorizeProduct(product: Product){
    product.authorized = "yes"
    product.status = "available"


    return this.httpClient.put(environment.endpointURL + 'products/' + product.productId, product ).subscribe((res: any) =>
    {
      console.log("Update:");
      console.log(res);

      //refresh page to update table
      this.updateProducts()
    })

  }

  rejectProduct(productId: number){
    return this.httpClient.delete(environment.endpointURL + 'products/' + productId).subscribe((res: any) =>
    {
      console.log("Delete:");

      //refresh page to update table
      this.updateProducts()
    })
  }

}

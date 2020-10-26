import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-product-authorization',
  templateUrl: './product-authorization.component.html',
  styleUrls: ['./product-authorization.component.css']
})
export class ProductAuthorizationComponent implements OnInit {

  products: any = [];


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.getProducts()
  }

  getProducts(){
    return this.httpClient.get(environment.endpointURL + 'products/authorized/no').subscribe((res: any) =>
    { this.products.push(res);
    console.log(res)});
  }

}

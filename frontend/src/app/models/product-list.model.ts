import { from } from 'rxjs';
import {Product} from './product.model';

export class ProductList {

    constructor(
      public products: Product[]
    ) {}

    addProduct(product: Product) : void {
        this.products.push(product);
    }

    removeProduct(product: Product) : void {
        const index = this.products.indexOf(product, 0);
        if (index > -1)
            this.products.splice(index, 1);
    }
  }
import { Pipe, PipeTransform } from '@angular/core';
import { ProductFilter } from './models/product-filter.model';
import { Product } from './models/product.model';

@Pipe({
  name: 'productPipe'
})
export class ProductPipe implements PipeTransform {

  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(products: Product[], productFilter: ProductFilter): Product[] {
    return products.filter((product) => 
      product.title.includes(productFilter.title)
    );
  }

}

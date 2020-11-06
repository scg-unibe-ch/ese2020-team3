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
      && product.location.includes(productFilter.location)
      && product.type.includes(productFilter.type)
      && product.sell_lend.includes(productFilter.sell_lend)
      && this.deliverableMatches(product.deliverable, productFilter.deliverable)
      && this.priceMatches(product.price, productFilter.minPrice, productFilter.maxPrice)
    );
  }

  deliverableMatches(productDeliverable: boolean, productFilterDeliverable: string) {
    return productFilterDeliverable == ""
          || (productFilterDeliverable == "true" && productDeliverable)
          || (productFilterDeliverable == "false" && !productDeliverable);
  }

  priceMatches(productPrice: number, productFilterMinPrice: number, productFilterMaxPrice: number) {
    return (productFilterMinPrice == null
            || productPrice >= productFilterMinPrice)
            &&
            (productFilterMaxPrice == null
            || productPrice <= productFilterMaxPrice);
  }

}

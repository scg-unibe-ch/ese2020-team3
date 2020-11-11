export class ProductFilter {

    constructor(
      public title: string, //some string or empty
      public type: string, //product or service or empty
      public sell_lend: string, //sell or lend or empty
      public location: string, //some string or empty
      public minPrice: number,
      public maxPrice: number,
      public deliverable: string //"true", "false" or ""
    ) {}
  }
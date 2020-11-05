export class Product {

    constructor(
      public productId: number,
      public title: string,
      public type: string,
      public description: string,
      public userId: number,
      public sell_lend: string,
      public location: string,
      public price: number,
      public status: string,
      public deliverable: boolean,
      public authorized: string
    ) {}
  }
export class Product {

    constructor(
      public productId: number,
      public ownerToken: string,
      public ownerName: string,
      public name: string,
      public description: string,
      public price: number,
      public bought: boolean
    ) {}
  }
export class Product {

    constructor(
      public productId: number,
      public ownerToken: string, //Token of seller
      public ownerName: string, //Name of seller
      public name: string,
      public description: string,
      public price: number,
      public bought: boolean, //Whether or not someone has added this product to their chart
      public confirmed: boolean //Whether or not an admin has confirmed this product
    ) {}
  }
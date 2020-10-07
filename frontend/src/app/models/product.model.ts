export class Product {

    constructor(
      public ownerToken: string, //Token of seller
      public ownerName: string, //Name of seller
      public name: string,
      public description: string,
      public price: number,
      public inChart: boolean
    ) {}
  }
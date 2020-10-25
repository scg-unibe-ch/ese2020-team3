export class Product {

    constructor(
      public title: string,
      public type: string,
      public description: string,
      public userId: number,
      public rent: boolean,
      public location: string,
      public price: number,
      public authorized: string
    ) {}
  }
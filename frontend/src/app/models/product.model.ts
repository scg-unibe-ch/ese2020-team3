export class Product {

    constructor(
      public title: string,
      public description: string,
      public ownerId: number,
      public ownerName: string,
      public state: string,
      public rent: boolean,
      public location: string,
      public price: number
    ) {}
  }
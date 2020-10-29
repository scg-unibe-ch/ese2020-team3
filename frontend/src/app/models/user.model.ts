export class User {

    constructor(
      public userId: number,
      public userToken: string,
      public userName: string,
      public wallet: number,
      public isAdmin: boolean
    ) {}
  }
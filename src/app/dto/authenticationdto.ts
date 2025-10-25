export class AuthenticationDTO{
    status:boolean;
    token:string;
    isOwner:boolean;

    // You can add a constructor to make initialization easier
    constructor(status: boolean, token: string,isOwner:boolean) {
      this.status = status;
      this.token = token;
      this.isOwner=isOwner;
    }
}
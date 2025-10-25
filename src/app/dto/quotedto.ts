import { QuoteItemDTO } from "./quoteitemdto";

export class QuoteDTO{
    id:number;
    idOpportunity:number;
    idCustomer:number;
    name:string;
    nameCustomer:string;
    phone:string;
    address:string;
    email:string;
    total:number;
    createDate:Date;
    active:boolean;
    quoteItems:QuoteItemDTO[] = [];

    // You can add a constructor to make initialization easier
    constructor(id: number, idOpportunity:number,idCustomer:number,
        name:string,nameCustomer:string,phone:string,address:string
        ,email:string,total:number,createDate:Date,active:boolean) {
      this.id = id;
      this.idOpportunity = idOpportunity;
      this.idCustomer = idCustomer;
      this.name = name;
      this.nameCustomer = nameCustomer;
      this.createDate = createDate;
      this.active = active;
      this.phone = phone;
      this.address = address;
      this.email = email;
      this.total = total;
    }
}
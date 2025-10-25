export class QuoteItemDTO{
    id:number;
    idQuote:number;
    unityPrice:number;
    amount:number;
    total:number;
    createDate:Date;
    active:boolean;
    description:string;
    productName:string;
    idProduct:number;

    // You can add a constructor to make initialization easier
    constructor(id: number, idQuote:number,unityPrice:number,
        amount:number,total:number,createDate:Date,active:boolean,description:string
        ,productName:string,idProduct:number) {
      this.id = id;
      this.idQuote = idQuote;
      this.unityPrice = unityPrice;
      this.amount = amount;
      this.total = total;
      this.createDate = createDate;
      this.active = active;
      this.description = description;
      this.productName = productName;
      this.idProduct = idProduct;
    }
}
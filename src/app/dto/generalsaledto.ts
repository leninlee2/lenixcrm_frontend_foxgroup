export class GeneralSaleDTO{
    id:number;
    idProduct:number;
    unityPrice:number;
    amount:number;
    totalPrice:number;
    cost:number;
    idCustomer:number;
    idSalesman:number;
    saleDate:Date;
    paymentDate:Date;
    paymentMode:string;
    createDate:Date;
    active:boolean;
    customerName!:string;
    salesman!:string;
    productName!:string;
    profit!:number;
    paid:boolean;
    delivered:boolean;

    // You can add a constructor to make initialization easier
    constructor(id:number, idProduct:number,unityPrice:number,amount:number
        ,totalPrice:number,cost:number,idCustomer:number,idSalesman:number
        ,saleDate:Date,paymentDate:Date,paymentMode:string,createDate:Date
        ,active:boolean,paid:boolean,delivered:boolean) {
      this.id = id;
      this.idProduct = idProduct;
      this.unityPrice = unityPrice;
      this.amount = amount;
      this.totalPrice = totalPrice;
      this.cost = cost;
      this.idCustomer = idCustomer;
      this.idSalesman = idSalesman;
      this.saleDate = saleDate;
      this.paymentDate = paymentDate;
      this.paymentMode = paymentMode;
      this.createDate = createDate;
      this.active = active;
      this.paid = paid;
      this.delivered = delivered;
    }
}
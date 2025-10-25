export class SalesCommisionGeneralDTO{
    id:number;
    value:number;
    order:number;
    createDate:Date;
    active:boolean;
    customer:string;
    salesman:string;
    commission:number;
    isManager:boolean;
    datePeriod:Date;
    idCustomer:number;
    idSalesman:number;
    manager:string;
    paymentDate!:Date;
    paymentMode:string;
    idManager:number;
    hasPayment!:boolean;
    specialPercent:number;
    percent!:number;

    // You can add a constructor to make initialization easier
    constructor(id: number, value:number,order:number,createDate:Date,active:boolean
        ,customer:string,salesman:string,commission:number,isManager:boolean
        ,datePeriod:Date,idCustomer:number,idSalesman:number,manager:string,paymentMode:string
        ,idManager:number,specialPercent:number
    ) {
      this.id = id;
      this.value = value;
      this.order = order;
      this.createDate = createDate;
      this.active = active;
      this.customer = customer;
      this.salesman = salesman;
      this.commission = commission;
      this.isManager = isManager;
      this.datePeriod = datePeriod;
      this.idCustomer = idCustomer;
      this.idSalesman = idSalesman;
      this.manager = manager;
      this.paymentMode = paymentMode;
      this.idManager = idManager;
      this.specialPercent=specialPercent;
    }
}
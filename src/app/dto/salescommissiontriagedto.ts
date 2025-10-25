export class SalesCommissionTriageDTO{
    id:number;
    value:number;
    percent:number;
    commission:number;
    idCustomer:number;
    customer:string;
    salesman:string; 
    idSalesman:number;  
    createDate:Date;
    active:boolean;   
    cM1:string;
    cM1Value:number;
    cM2:string;
    cM2Value:number;
    datePeriod:Date;    
    
    // You can add a constructor to make initialization easier
    constructor(id: number, value:number, percent:number,commission:number,idCustomer:number
        ,customer:string,salesman:string,idSalesman:number,createDate:Date,active:boolean
        ,cM1:string,cM1Value:number,cM2:string,cM2Value:number
        ,datePeriod:Date
    ) {
      this.id = id;
      this.value = value;
      this.percent = percent;
      this.commission = commission;
      this.idCustomer = idCustomer;
      this.customer = customer;
      this.salesman = salesman;
      this.idSalesman = idSalesman;
      this.createDate = createDate;
      this.active = active;
      this.cM1 = cM1;
      this.cM1Value = cM1Value;  
      this.cM2 = cM2;
      this.cM2Value = cM2Value;
      this.datePeriod = datePeriod;
    }
}
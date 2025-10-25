export class PaymentDTO{
    id:number;
    idSalesman:number;
    paymentMode:string;
    value:number;
    commission:number;
    total:number;
    paymentDate:Date|null;
    serviceMaterial:string;
    nameSalesman:string;
    description:string;
    createDate:Date;
    hasCommission:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, paymentMode:string,idSalesman:number,paymentDate:Date
        ,value:number,serviceMaterial:string,nameSalesman:string,createDate:Date
        ,description:string,commission:number,total:number,hasCommission:boolean) {
      this.id = id;
      this.paymentMode = paymentMode;
      this.idSalesman = idSalesman;
      this.paymentDate = paymentDate;
      this.value = value;
      this.serviceMaterial=serviceMaterial;
      this.nameSalesman = nameSalesman;
      this.createDate=createDate;
      this.description=description;
      this.commission=commission;
      this.total=total;
      this.hasCommission=hasCommission;
    }
}
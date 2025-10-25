export class SalesIncomeDTO{
    id:number;
    value:number;
    order:number;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, value:number,order:number,createDate:Date,active:boolean) {
      this.id = id;
      this.value = value;
      this.order = order;
      this.createDate = createDate;
      this.active = active;
    }
}
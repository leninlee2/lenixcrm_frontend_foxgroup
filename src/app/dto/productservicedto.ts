export class ProductServiceDTO{
    id:number;
    name:string;
    unityPrice:number;
    createDate:Date;
    active:boolean;
    cost:number;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,unityPrice:number,createDate:Date,active:boolean,cost:number) {
      this.id = id;
      this.name = name;
      this.unityPrice = unityPrice;
      this.createDate = createDate;
      this.active = active;
      this.cost = cost;
    }
}
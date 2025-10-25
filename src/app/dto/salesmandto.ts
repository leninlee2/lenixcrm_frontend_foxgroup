export class SalesmanDTO{
    id:number;
    name:string;
    type:number;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,type:number) {
      this.id = id;
      this.name = name;
      this.type = type;
    }
}
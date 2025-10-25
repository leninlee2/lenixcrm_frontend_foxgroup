export class AccessGroupDTO{
    id:number;
    name:string;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,createDate:Date,active:boolean) {
      this.id = id;
      this.name = name;
      this.createDate = createDate;
      this.active = active;
    }
}
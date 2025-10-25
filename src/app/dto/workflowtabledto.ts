export class WorkflowTableDTO{
    id:number;
    idSTable:number;
    name:string;
    alias:string;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number,idSTable:number, name:string,alias:string,createDate:Date,active:boolean) {
      this.id = id;
      this.idSTable = idSTable;
      this.name = name;
      this.alias = alias;
      this.createDate = createDate;
      this.active = active;
    }
}
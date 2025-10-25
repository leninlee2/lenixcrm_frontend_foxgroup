export class WorkflowFieldDTO{
    id:number;
    idTable:number;
    tableName:string;
    name:string;
    realName:string;
    dataType:string;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number,idTable:number,tableName:string
        ,realName:string, name:string,dataType:string
        ,createDate:Date,active:boolean) {
      this.id = id;
      this.idTable = idTable;
      this.tableName = tableName;
      this.name = name;
      this.realName = realName;
      this.dataType = dataType;
      this.createDate = createDate;
      this.active = active;
    }
}
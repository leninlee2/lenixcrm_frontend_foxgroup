export class SysColumnDTO{
    id:number;
    name:string;
    dataType:string;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string, dataType:string) {
      this.id = id;
      this.name = name;
      this.dataType = dataType;
    }
}
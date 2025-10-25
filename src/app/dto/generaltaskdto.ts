export class GeneralTaskDTO{
    id:number;
    idSalesman:number;
    name:string;
    createDate:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, idSalesman: number,name:string,createDate:Date) {
      this.id = id;
      this.idSalesman = idSalesman;
      this.name = name;
      this.createDate = createDate;
    }
}
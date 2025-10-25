export class LogChangeTabDTO{
    idOpportunity:number;
    idCategory:number;
    idPipeline:number;
    nameCategory:string;
    nameTab:string;
    owner:string;
    nameUser:string;
    createDate:Date;

    // You can add a constructor to make initialization easier
    constructor(idOpportunity:number, idCategory: number,idPipeline:number
        ,nameCategory:string,nameTab:string ,owner:string, nameUser:string, createDate:Date) {
      this.idOpportunity = idOpportunity;
      this.idCategory = idCategory;
      this.idPipeline = idPipeline;
      this.nameCategory = nameCategory;
      this.nameTab = nameTab;
      this.owner = owner;
      this.nameUser = nameUser;
      this.createDate = createDate;
    }
}
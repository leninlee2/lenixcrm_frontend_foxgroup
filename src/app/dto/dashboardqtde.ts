export class DashboardQtde{
    qtde:number;
    idPipeline:number;
    name:string;

    // You can add a constructor to make initialization easier
    constructor(qtde: number,idPipeline:number,name:string) {
      this.qtde = qtde;
      this.idPipeline = idPipeline;
      this.name = name;
    }
}
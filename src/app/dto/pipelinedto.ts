export class PipelineDTO{
    id:number;
    name:string;
    idCategory:number;
    conversion:boolean = false;
    idRole:number;
    idForm:number;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,idCategory:number,conversion:boolean,idRole:number,idForm:number) {
      this.id = id;
      this.name = name;
      this.idCategory = idCategory;
      this.conversion = conversion;
      this.idRole=idRole;
      this.idForm=idForm;
    }
}
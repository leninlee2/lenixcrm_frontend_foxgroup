export class OpportunityFileS3DTO{

    idOpportunity: number;
    contentType:string;
    id:number;
    idLegacy:number;
    path:string;
    fileTypeId:number;

    // You can add a constructor to make initialization easier
    constructor(idOpportunity: number, contentType: string,id:number,idLegacy:number,path:string,fileTypeId:number) {
      this.idOpportunity = idOpportunity;
      this.contentType = contentType;
      this.id=id;
      this.idLegacy = idLegacy;
      this.path = path;
      this.fileTypeId = fileTypeId;
    }
}
export class OpportunityFileDTO{

    idOpportunity: number;
    fileName: string;
    fileData: any;
    fileDataString:string;
    contentType:string;
    id:number;
    idUser:number;

    // You can add a constructor to make initialization easier
    constructor(idOpportunity: number,fileName: string, fileData: any
      ,fileDataString:string, contentType: string,id:number,idUser:number) {
      this.idOpportunity = idOpportunity;
      this.fileName = fileName;
      this.fileData = fileData;
      this.fileDataString = fileDataString;
      this.contentType = contentType;
      this.id=id;
      this.idUser=idUser;
    }
}
import { OpportunityFileDTO } from "./opportunityfiledto";
import { OpportunityFileS3DTO } from "./opportunityfiles3dto";

export class FileTypeDTO{
    id:number;
    name:string;
    opportunityFiles:OpportunityFileDTO[] = [];
    opportunityFilesS3:OpportunityFileS3DTO[] = [];

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,opportunityFiles:OpportunityFileDTO[],opportunityFilesS3:OpportunityFileS3DTO[]) {
      this.id = id;
      this.name = name;
      this.opportunityFiles = opportunityFiles;
      this.opportunityFilesS3 = opportunityFilesS3;
    }
}
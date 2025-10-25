export class WorkflowAutomationDTO{
    id:number;
    name:string;
    idAction:number;
    idCriticity:number;
    idTemplate:number;
    createDate:Date;
    active:boolean;
    message:string;
    idPipeline:number;

    // You can add a constructor to make initialization easier
    constructor(id: number,name:string
        ,createDate:Date,active:boolean,idAction:number
        ,idCriticity:number,message:string,idTemplate:number
        ,idPipeline:number) {
      this.id = id;
      this.name = name;
      this.createDate = createDate;
      this.active = active;
      this.idAction = idAction;
      this.idCriticity = idCriticity;
      this.message = message;
      this.idTemplate = idTemplate;
      this.idPipeline=idPipeline;
    }
}
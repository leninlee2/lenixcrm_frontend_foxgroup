export class WorkflowItemOrGroupDTO{
    id:number;
    parentId:number;
    idWorkflow:number;
    idAction:number;
    field:string;
    startValue:string;
    endValue:string;
    isGroup:boolean;
    operator:string;
    unity:string;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number,parentId:number, idWorkflow:number,createDate:Date,active:boolean
      ,idAction:number,field:string,startValue:string,endValue:string,isGroup:boolean
      ,operator:string,unity:string
      ) {
      this.id = id;
      this.parentId = parentId;
      this.idWorkflow = idWorkflow;
      this.createDate = createDate;
      this.active = active;
      this.idAction = idAction;
      this.field = field;
      this.startValue = startValue;
      this.endValue = endValue;
      this.isGroup = isGroup;
      this.operator = operator;
      this.unity = unity;
    }
}
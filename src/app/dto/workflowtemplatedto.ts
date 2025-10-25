export class WorkflowTemplateDTO{
    id:number;
    name:string;
    html:string;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number,name:string,html:string,createDate:Date,active:boolean) {
      this.id = id;
      this.name = name;
      this.html = html;
      this.createDate = createDate;
      this.active = active;
    }
}
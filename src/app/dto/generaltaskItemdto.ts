export class GeneralTaskItemDTO{
    id:number;
    idGeneralTask:number;
    description:string;
    parentId:number;
    done:boolean;
    deadline:Date;
    active:boolean;
    firstLevel:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, idGeneralTask: number,description:string
        ,deadline:Date,parentId:number,done:boolean
        ,active:boolean,firstLevel:boolean) {
      this.id = id;
      this.idGeneralTask = idGeneralTask;
      this.description = description;
      this.deadline = deadline;
      this.parentId = parentId;
      this.done = done;
      this.active = active;
      this.firstLevel = firstLevel;
    }
}
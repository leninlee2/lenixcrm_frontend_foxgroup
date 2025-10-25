export class GeneralTaskTreeDTO{
    id:number;
    key:string;
    label:string;
    data:string;
    icon:string;
    parentId:number;
    idGeneralTask:number;
    done:boolean;
    children:GeneralTaskTreeDTO[] = [];
    expanded:boolean = true;
    deadline:Date;
    firstLevel:boolean;
    opportunityPipe:OpportunityPipeDetail[] = [];
    freeVisits:number;
    parentName:string;
    scheduleAreaDTO:ScheduleAreaDTO;

    // You can add a constructor to make initialization easier
    constructor(id:number, key:string,label:string,data:string
        ,parentId:number,idGeneralTask:number,done:boolean,deadline:Date
        ,icon:string,firstLevel:boolean,children:GeneralTaskTreeDTO[]
        ,opportunityPipe:OpportunityPipeDetail[], freeVisits:number, parentName:string,scheduleAreaDTO:ScheduleAreaDTO ) {
      this.id = id;
      this.key = key;
      this.label = label;
      this.data = data;
      this.icon = icon;
      this.children = children;
      this.parentId = parentId;
      this.idGeneralTask = idGeneralTask;
      this.done = done;
      this.deadline = deadline;
      this.expanded = true;
      this.firstLevel = firstLevel;
      this.opportunityPipe = opportunityPipe;
      this.freeVisits = freeVisits;
      this.parentName = parentName;
      this.scheduleAreaDTO=scheduleAreaDTO;
    }
}

export class OpportunityPipeDetail{
  id:number;
  appointment:Date;
  nameCustomer:string;
  weekDay:number;

   constructor(id:number, appointment:Date,nameCustomer:string,weekDay:number) {
      this.id = id;
      this.appointment = appointment;
      this.nameCustomer = nameCustomer;
      this.weekDay = weekDay;
    }
}

export class ScheduleControlDTO{
  startFilter:Date;
  endFilter:Date;
  idUser:number;
  nameCustomer:string;

   constructor(startFilter:Date,endFilter:Date, idUser:number,nameCustomer:string) {
      this.startFilter = startFilter;
      this.endFilter = endFilter;
      this.idUser = idUser;
      this.nameCustomer = nameCustomer;
    }
}

export class ScheduleAreaDTO{
  id:number;
  area:string;
  idUser:number;
  owner:string;
  scheduleDate:Date;

   constructor(id:number,area:string, idUser:number
    ,owner:string,scheduleDate:Date) {
      this.id = id;
      this.area = area;
      this.idUser = idUser;
      this.owner = owner;
      this.scheduleDate=scheduleDate;
    }
}
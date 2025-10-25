import { FileTypeDTO } from "./filetypedto";

export class OpportunityPipelineDTO{
    id: number;
    idCategory: number;
    idPipeline: number;
    idCustomer: number;
    nameCategory: string;
    namePipeline: string;
    nameCustomer: string;
    phone:string;
    address:string;
    email:string;
    details:string;
    value:number;
    owner:string;
    createTime:Date;
    updateTime:Date;
    fileTypesByOpportunity:FileTypeDTO[] = [];
    appointment:string;
    idProduct:number;
    idUser:number;
    idCriticity:number;
    color:string;
    deadlineStand:Date | null;
    emailUser:string;
    setters:string;

    // You can add a constructor to make initialization easier
    constructor(id: number, idCategory: number,idPipeline: number,idCustomer: number
      ,nameCategory: string,namePipeline: string,nameCustomer: string,phone:string
      ,address:string,email:string,details:string,value:number,owner:string
      ,createTime:Date,updateTime:Date
      ,appointment:string,idProduct:number,idUser:number,idCriticity:number
      ,color:string,deadlineStand:Date | null,emailUser:string,setters:string) {
      this.id = id;
      this.idCategory = idCategory;
      this.idPipeline = idPipeline;
      this.idCustomer = idCustomer;
      this.nameCategory = nameCategory;
      this.namePipeline = namePipeline;
      this.nameCustomer = nameCustomer;
      this.phone = phone;
      this.address = address;
      this.email = email;
      this.details = details;
      this.value=value;
      this.owner = owner;
      this.createTime=createTime;
      this.updateTime=updateTime;
      this.appointment = appointment;
      this.idProduct = idProduct;
      this.idUser = idUser;
      this.idCriticity = idCriticity;
      this.color = color;
      this.deadlineStand=deadlineStand;
      this.emailUser=emailUser;
      this.setters=setters;
    }

    
}

export class CheckNewSchedule{
  hasOpportunity:boolean;
  idOpportunity:number;
  owner:string;
  schedule:Date;
  idUser:number;

  constructor(hasOpportunity: boolean, idOpportunity: number,owner: string
     ,schedule: Date ,idUser: number) {
      this.hasOpportunity = hasOpportunity;
      this.idOpportunity = idOpportunity;
      this.owner = owner;
      this.schedule = schedule;
      this.idUser = idUser;
    }

}
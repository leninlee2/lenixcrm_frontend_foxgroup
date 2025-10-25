export class UserGroupDTO{
    id:number;
    idUser:number;
    idGroup:number;
    createDate:Date;
    active:boolean;
    groupName!:string;

    // You can add a constructor to make initialization easier
    constructor(id: number, idUser:number,idGroup:number,createDate:Date,active:boolean) {
      this.id = id;
      this.idUser = idUser;
      this.idGroup = idGroup;
      this.createDate = createDate;
      this.active = active;
    }
}
export class GroupMenuDTO{
    id:number;
    idGroup:number;
    name:string;
    active:boolean;
    createDate:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, idGroup: number,name:string
        ,active:boolean,createDate:Date ) {
      this.id = id;
      this.idGroup = idGroup;
      this.name = name;
      this.active = active;
      this.createDate = createDate;
    }
}
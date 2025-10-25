export class LoginDTO{
    name:string;
    email:string;
    password:string;
    phone:string;
    createdDate:Date;
    id:number;
    groupName:string;
    idFile:number;

    // You can add a constructor to make initialization easier
    constructor(email: string, password: string,name:string,phone:string,createdDate:Date
      ,id:number,groupName:string,idFile:number) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.phone = phone;
      this.createdDate = createdDate;
      this.id = id;
      this.groupName = groupName;
      this.idFile = idFile;
    }
}
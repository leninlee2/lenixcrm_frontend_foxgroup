export class CustomerDTO{
    id:number;
    name:string;
    email:string;
    address:string;
    phone:string;
    createdDate: Date;
    tags:string;
    updated: Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, name: string, email: string,address:string,phone:string,createdDate:Date,tags:string,updated:Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.address = address;
      this.phone = phone;
      this.createdDate = createdDate;
      this.tags = tags;
      this.updated = updated;
    }
}
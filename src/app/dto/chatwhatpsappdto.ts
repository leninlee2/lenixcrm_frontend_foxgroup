export class ChatWhatpsAppDTO{
    id:number;
    idOpportunity:number;
    message:string;
    from:string;
    ssid:string;
    createdDate:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, idOpportunity:number,message:string,from:string,ssid:string,createdDate:Date) {
      this.id = id;
      this.idOpportunity = idOpportunity;
      this.message = message;
      this.from = from;
      this.ssid = ssid;
      this.createdDate = createdDate;
    }
}
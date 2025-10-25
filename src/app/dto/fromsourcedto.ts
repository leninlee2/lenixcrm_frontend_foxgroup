export class FromSourceDTO{
    from:string;
    source:number;
    lastMessage:string;
    id:string;
    url:string;
    total:number;
    createdDate:Date;
    numMessages:number;

    // You can add a constructor to make initialization easier
    constructor(from:string, source:number,lastMessage:string,id:string,url:string,total:number
      ,createdDate:Date,numMessages:number) {
      this.from = from;
      this.source = source;
      this.lastMessage = lastMessage;
      this.id = id;
      this.url = url;
      this.total = total;
      this.createdDate = createdDate;
      this.numMessages = numMessages;
    }
}
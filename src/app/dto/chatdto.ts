export class ChatDTO{
    id:string;
    message:string;
    createdDate:Date;
    sourceMessage:number;
    from:string;

    // You can add a constructor to make initialization easier
    constructor(id: string, message: string, createdDate: Date,sourceMessage:number,from:string) {
      this.id = id;
      this.message = message;
      this.createdDate = createdDate;
      this.sourceMessage = sourceMessage;
      this.from = from;
    }
}
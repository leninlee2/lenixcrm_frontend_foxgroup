export class CalendarDTO{
    id:number;
    title:string;
    start:Date;
    end:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, title: string,start:Date,end:Date) {
      this.id = id;
      this.title = title;
      this.start=start;
      this.end=end;
    }
}
export class NotesDTO{
    id:number;
    idOpportunity:number;
    note:string;
    createdDate:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, idOpportunity: number,note:string,createdDate:Date) {
      this.id = id;
      this.idOpportunity = idOpportunity;
      this.note = note;
      this.createdDate = createdDate;
    }
}
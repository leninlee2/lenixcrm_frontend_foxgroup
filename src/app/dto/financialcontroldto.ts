export class FinancialControlDTO{
    id:number;
    idOpportunity:number;
    name:string;
    recto:boolean;
    value:number;
    balance:number;
    comment:string;
    order:number;
    createDate:Date;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id:number,
        idOpportunity:number,
        name:string,
        recto:boolean,
        value:number,
        balance:number,
        comment:string,
        order:number,
        createDate:Date,
        active:boolean) {
        this.id = id;
        this.idOpportunity = idOpportunity;
        this.name = name;
        this.recto = recto;
        this.value = value;
        this.balance = balance;
        this.comment = comment;
        this.order = order;
        this.createDate = createDate;
        this.active = active;
    }
}
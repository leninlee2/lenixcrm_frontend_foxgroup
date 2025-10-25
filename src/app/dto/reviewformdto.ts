export class ReviewFormDTO{
    id:number;
    idOpportunity:number;
    howOpen:string;
    additionalServices:string;
    isAboutAcouple:boolean;
    theCoupleWerePresent:boolean;
    budget:number;
    mainProduct:string;
    closingDeadline:Date;
    discountDescription:string;
    createDate:Date;
    isNeededCrane:boolean;
    isNeededFence:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, idOpportunity:number,howOpen:string,
        additionalServices:string,isAboutAcouple:boolean,
        theCoupleWerePresent:boolean,budget:number,mainProduct:string
        ,closingDeadline:Date,discountDescription:string,createDate:Date
        ,isNeededCrane:boolean,isNeededFence:boolean
      ) {
      this.id = id;
      this.idOpportunity = idOpportunity;
      this.howOpen = howOpen;
      this.additionalServices = additionalServices;
      this.isAboutAcouple = isAboutAcouple;
      this.createDate = createDate;
      this.theCoupleWerePresent = theCoupleWerePresent;
      this.budget = budget;
      this.mainProduct = mainProduct;
      this.closingDeadline = closingDeadline;
      this.discountDescription=discountDescription;
      this.isNeededCrane=isNeededCrane;
      this.isNeededFence=isNeededFence;
    }
}
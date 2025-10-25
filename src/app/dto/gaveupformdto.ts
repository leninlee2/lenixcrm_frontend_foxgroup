export class GaveUpFormDTO{
    id:number;
    idOpportunity:number;
    whyGaveUp:string;
    contactCount:number;
    contactWays:string;
    kindOfOffer:string;
    wasTriedShell:boolean;
    discountHelp:boolean;
    finantialProblems:boolean;
    whatWouldDoDiff:string;

    // You can add a constructor to make initialization easier
    constructor(id:number, idOpportunity:number,whyGaveUp:string
        ,contactCount:number,contactWays:string,kindOfOffer:string
      ,wasTriedShell:boolean,discountHelp:boolean,finantialProblems:boolean
      ,whatWouldDoDiff:string
    ) {
      this.id = id;
      this.idOpportunity = idOpportunity;
      this.whyGaveUp = whyGaveUp;
      this.contactCount = contactCount;
      this.contactWays = contactWays;
      this.kindOfOffer = kindOfOffer;
      this.wasTriedShell = wasTriedShell;
      this.discountHelp = discountHelp;
      this.finantialProblems = finantialProblems;
      this.whatWouldDoDiff = whatWouldDoDiff;
    }
}
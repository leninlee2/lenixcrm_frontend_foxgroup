import { SalesPipelineDTO } from "./salespipelinedto";

export class DashboardDTO{
    pipelineCount:number;
    valueOpportunity:number;
    valueClosed:number;
    valueGaveup:number;
    grown:number;
    grownClosed:number;
    grownGaveUp:number;
    countCustomers:number;
    countCustomersPastWeek:number;
    chatCount:number;
    salesPipelineDTO:SalesPipelineDTO[] = [];

    // You can add a constructor to make initialization easier
    constructor(pipelineCount: number,valueOpportunity:number,grown:number,countCustomers:number
        ,countCustomersPastWeek:number,chatCount:number,valueClosed:number,valueGaveup:number
        ,grownClosed:number,grownGaveUp:number) {
      this.pipelineCount = pipelineCount;
      this.valueOpportunity = valueOpportunity;
      this.grown = grown;
      this.countCustomers = countCustomers;
      this.countCustomersPastWeek = countCustomersPastWeek;
      this.chatCount = chatCount;
      this.valueClosed=valueClosed;
      this.valueGaveup=valueGaveup;
      this.grownClosed=grownClosed;
      this.grownGaveUp=grownGaveUp;
    }
}
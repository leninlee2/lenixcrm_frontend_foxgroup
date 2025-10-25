import { OpportunityPipelineDTO } from "./opportunitypipelinedto";

export class OpportunityDTO{

    idPipeline: number;
    namePipeline: string;
    opportunityPipeline: OpportunityPipelineDTO[];

    // You can add a constructor to make initialization easier
    constructor(idPipeline: number,namePipeline: string, opportunityPipeline: OpportunityPipelineDTO[]) {
      this.idPipeline = idPipeline;
      this.namePipeline = namePipeline;
      this.opportunityPipeline = opportunityPipeline;
    }
}
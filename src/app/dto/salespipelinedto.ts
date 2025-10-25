export class SalesPipelineDTO{
    value:number;
    name:string;

    // You can add a constructor to make initialization easier
    constructor(value: number, name:string) {
      this.value = value;
      this.name = name;
    }
}
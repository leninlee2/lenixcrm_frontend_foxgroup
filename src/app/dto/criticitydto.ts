export class CriticityDTO{
    id:number;
    name:string;
    color:string;
    active:boolean;

    // You can add a constructor to make initialization easier
    constructor(id: number, name:string,color:string,active:boolean) {
      this.id = id;
      this.name = name;
      this.color = color;
      this.active = active;
    }
}
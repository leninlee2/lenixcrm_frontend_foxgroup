export class CategoryDTO{
    id:number;
    name:string;

    // You can add a constructor to make initialization easier
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
}
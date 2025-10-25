export class StockDTO{
    id:number;
    idProduct:number;
    startStock:number;
    availableStock:number;
    active:boolean;
    createDate:Date;

    // You can add a constructor to make initialization easier
    constructor(id: number, idProduct:number, startStock:number, availableStock:number,active:boolean,createDate:Date) {
      this.id = id;
      this.idProduct = idProduct;
      this.startStock = startStock;
      this.availableStock = availableStock;
      this.active = active;
      this.createDate = createDate;
    }
}
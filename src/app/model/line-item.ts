import { Product } from "./product";

export class LineItem {
    constructor(
      public id: number = 0, 
      public invoiceId: number = 0, 
      public product: Product = new Product(), 
      public quantity: number = 0) {
    }
  }
import {Product} from "./product";

export class Inventory {
  constructor(
    public product: Product,
    public id: number,
    public id_size: number,
    public status: string,
  ) {
  }
}

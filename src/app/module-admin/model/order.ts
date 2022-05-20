import { Product } from './product';

export class Order {
  public id: number;
  public date: string;
  public dispatch: string;
  public selectedSize: string;
  public rentalType: string;

  constructor(public product: Product, public member: boolean) {}
}

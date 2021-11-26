
import {Product} from './product';
import {Image} from "./image";

export class BookingRequest {
  public id: number;
  public startDate: Date;
  public collectionPlace: string;
  public sizeName: string;
  public rentalType: string;
  public productId: number;
  public product: Product;
  public productSize: number;
  public status: string;
  public coverImg: Image;

}

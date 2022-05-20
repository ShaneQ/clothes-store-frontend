import { Product } from './product';
import { Image } from './image';
import { Size } from './size';

export class BookingRequest {
  public id: number;
  public startDate: Date;
  public returnDate: Date;
  public collectionPlace: string;
  public sizeName: string;
  public rentalType: string;
  public productId: number;
  public product: Product;
  public productSize: Size;
  public status: string;
  public coverImg: Image;
}

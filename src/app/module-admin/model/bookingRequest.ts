import { Size } from './size';

export class BookingRequest {
  public id: number;
  public startDate: Date;
  public returnDate: Date;
  public collectionPlace: string;
  public productId: number;
  public productName: string;
  public productSize: Size;
  public status: string;
  public userId: string;
  public userName: string;
}

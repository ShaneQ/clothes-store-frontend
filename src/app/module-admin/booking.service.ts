import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AdminAppService} from "./admin-app.service";
import {Observable} from "rxjs";
import {BookingRequest} from "./model/bookingRequest";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private adminUrl = environment.resourceUrl + 'admin';

  constructor(private _service: AdminAppService) {
  }

  getBookings(): Observable<BookingRequest[]> {
    return this._service.getBookingsResource(this.adminUrl + "/bookings");

  }

  getBookingsForUser(userId: string): Observable<BookingRequest[]> {
    return this._service.getBookingsResource(this.adminUrl + "/bookings/user/" + userId);
  }

  getBookingsForProduct(productId: number): Observable<BookingRequest[]> {
    return this._service.getBookingsResource(this.adminUrl + "/bookings/product/" + productId);
  }

  updateBookingStatus(value: string, id: number) {
    this._service.updateBookingStatus(this.adminUrl + "/booking/" + id + "/status/" + value);
  }
}
